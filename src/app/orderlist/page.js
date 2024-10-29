"use client"; // Ensure this is included for client components

import { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; // Import updateDoc for updating Firestore
import { db } from "../Database/Config";
import "../styles/OrderList.css";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

export default function OrderListPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize the router

  // Fetch orders from Firestore on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(db, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = ordersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id, field, value) => {
    try {
      const orderDoc = doc(db, "orders", id);
      await updateDoc(orderDoc, { [field]: value });
      // Update the local state to reflect the change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, [field]: value } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div>
      <h1>Orders</h1>
      <button onClick={() => router.push("/")}>Back to Home</button>{" "}
      {/* Back button */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>City</th>
            <th>Total</th>
            <th>Items</th>
            <th>Order Date</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.fullName}</td>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.address}</td>
              <td>{order.city}</td>
              <td>${order.total}</td>
              <td>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Size: {item.selectedSize}, Qty:{" "}
                      {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={order.paymentStatus || false} // Default to false if undefined
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      "paymentStatus",
                      e.target.checked
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={order.deliveryStatus || false} // Default to false if undefined
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      "deliveryStatus",
                      e.target.checked
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
