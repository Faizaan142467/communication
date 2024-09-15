const socket = io();

// For the customer page
socket.on('updateShopStatus', (status) => {
    document.getElementById('shopStatus').innerText = status ? 'Open' : 'Closed';
});

// For the admin page
const toggleBtn = document.getElementById('toggleStatusBtn');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const currentStatus = document.getElementById('shopStatus').innerText === 'Open';
        const newStatus = !currentStatus;
        socket.emit('toggleShopStatus', newStatus);
        location.reload(); // Reload the page to update the button text
    });
}