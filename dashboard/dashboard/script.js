//  for side nav bar
const listGroupItems = document.querySelectorAll('.list-group-item');

listGroupItems.forEach(item => {
    item.addEventListener('click', () => {
        listGroupItems.forEach(item => {
            item.classList.remove('active');
        });
        item.classList.add('active');
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const sidebar = document.getElementById("sidebar-wrapper");
    menuToggle.addEventListener("click", function () {
        document.getElementById("wrapper").classList.toggle("toggled");
    });
});


// for column charts
var options = {
    chart: {
        type: 'bar'
    },
    series: [{
        name: 'sales',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125]
    }],
    xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
    }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


// for pie charts
var options = {
    series: [44, 55, 13, 43, 22],
    chart: {
        width: 380,
        type: 'pie',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#pie_chart"), options);
chart.render();


// for datatable
$(document).ready(function () {
    $('#myDataTable').DataTable()
});