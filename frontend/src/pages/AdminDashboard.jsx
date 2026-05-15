// src/pages/AdminDashboard.jsx

import './AdminDashboard.css';

function AdminDashboard() {

  const users = [
    {
      name: 'Alex',
      plan: 'Pro'
    },

    {
      name: 'Sarah',
      plan: 'Free'
    },

    {
      name: 'Michael',
      plan: 'Team'
    }
  ];

  return (
    <div className="admin-dashboard">

      <div className="admin-header">

        <h1>
          Admin Dashboard
        </h1>

        <button>
          Export Analytics
        </button>

      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">

          <h2>
            12K
          </h2>

          <p>
            Total Users
          </p>

        </div>

        <div className="admin-stat-card">

          <h2>
            48K
          </h2>

          <p>
            AI Generations
          </p>

        </div>

        <div className="admin-stat-card">

          <h2>
            $24K
          </h2>

          <p>
            Revenue
          </p>

        </div>

      </div>

      <div className="admin-users">

        <h2>
          Users
        </h2>

        <table>

          <thead>

            <tr>

              <th>
                Name
              </th>

              <th>
                Subscription
              </th>

              <th>
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map(
              (user, index) => (

                <tr key={index}>

                  <td>
                    {user.name}
                  </td>

                  <td>
                    {user.plan}
                  </td>

                  <td>
                    Active
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminDashboard;