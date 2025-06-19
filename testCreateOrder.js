const axios = require('axios');

async function testCreateOrder() {
  try {
    const response = await axios.post('http://localhost:3000/api/orders/create', {
      customerId: 1,
      type: 'Dine-In',
      status: 'Pending',
      total: 100,
      items: [1, 2],
    }, {
      headers: {
        Authorization: 'Bearer YOUR_JWT_TOKEN', // Replace with a valid token
      },
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testCreateOrder();
