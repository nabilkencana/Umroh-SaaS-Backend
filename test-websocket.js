// Test WebSocket Tracking
// Run: node test-websocket.js

const io = require('socket.io-client');

console.log('🧪 Testing WebSocket Tracking...\n');

// Connect to WebSocket server
const socket = io('http://localhost:3001', {
    transports: ['websocket'],
    reconnection: true
});

const tenantId = '83f65878-5bc2-43a5-9439-6599237a8573';
const jamaahId = '9fc3ceb1-465d-4bdd-8d50-d6afec071607'; // Siti Aminah

// Connection events
socket.on('connect', () => {
    console.log('✅ Connected to WebSocket server');
    console.log(`   Socket ID: ${socket.id}\n`);

    // Join tenant room
    console.log('📡 Joining tenant room...');
    socket.emit('join', { tenant_id: tenantId });
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected from server');
});

socket.on('connect_error', (error) => {
    console.error('❌ Connection error:', error.message);
});

// Listen for join confirmation
socket.on('joined', (data) => {
    console.log('✅ Joined tenant room:', data.tenant_id);
    console.log('');

    // Send test location update after joining
    setTimeout(() => {
        console.log('📍 Sending location update...');
        const locationData = {
            tenant_id: tenantId,
            jamaah_id: jamaahId,
            latitude: 21.4225, // Makkah coordinates
            longitude: 39.8262,
            status: 'active'
        };

        console.log('   Data:', JSON.stringify(locationData, null, 2));
        socket.emit('location_update', locationData);
    }, 1000);
});

// Listen for location update confirmation
socket.on('location_updated', (data) => {
    console.log('\n✅ Location update confirmed!');
    console.log('   Response:', JSON.stringify(data, null, 2));
});

// Listen for tracking updates (broadcast to all in room)
socket.on('tracking_update', (data) => {
    console.log('\n📡 Received tracking update (broadcast):');
    console.log('   Jamaah:', data.jamaah?.full_name || 'Unknown');
    console.log('   Location:', `${data.latitude}, ${data.longitude}`);
    console.log('   Status:', data.status);
    console.log('   Time:', new Date(data.created_at).toLocaleString());

    // Disconnect after receiving update
    setTimeout(() => {
        console.log('\n✅ Test completed successfully!');
        console.log('🎉 WebSocket tracking is working!\n');
        socket.disconnect();
        process.exit(0);
    }, 1000);
});

// Timeout if no response
setTimeout(() => {
    console.log('\n⏱️  Timeout - closing connection');
    socket.disconnect();
    process.exit(1);
}, 10000);
