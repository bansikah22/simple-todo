// Function to render the task completion chart
function renderChart() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completedCount = tasks.filter(task => task.completed).length;
    const pendingCount = tasks.length - completedCount;

    const ctx = document.getElementById('taskChart').getContext('2d');

    if (window.taskChart) {
        window.taskChart.destroy(); // Destroy previous chart instance if it exists
    }

    window.taskChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'Pending'],
            datasets: [{
                label: 'Task Completion',
                data: [completedCount, pendingCount],
                backgroundColor: ['#007bff', '#d3d3d3'], // Blue for completed, light gray for pending
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        }
    });
}

// Call renderChart on page load
window.onload = renderChart;
