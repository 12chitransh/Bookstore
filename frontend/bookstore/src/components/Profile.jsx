import { useAuth } from '../contexts/AuthContext';

function Profile() {
  const { user, orders } = useAuth(); // Assume orders in auth context

  return (
    <div className="p-4">
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <h2>Order History</h2>
      {orders.map(order => (
        <div key={order.id}>
          <p>Order ID: {order.id} - Total: ${order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Profile;