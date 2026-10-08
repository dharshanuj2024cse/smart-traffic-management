/* =========================================================
   SMART TRAFFIC MANAGEMENT SYSTEM
   FRONTEND ONLY
   NO DATABASE
   ========================================================= */


/* ================= TRAFFIC DATA ================= */

const intersections = [

    {
        id: "J-01",
        name: "Central & 1st",
        traffic: 38,
        vehicles: 42,
        signal: "GREEN",
        action: "Extend green",
        phase: 48
    },

    {
        id: "J-02",
        name: "Market & 2nd",
        traffic: 72,
        vehicles: 76,
        signal: "RED",
        action: "Hold red",
        phase: 34
    },

    {
        id: "J-03",
        name: "Airport & Main",
        traffic: 54,
        vehicles: 61,
        signal: "YELLOW",
        action: "Balance flow",
        phase: 41
    },

    {
        id: "J-04",
        name: "Station Road",
        traffic: 84,
        vehicles: 91,
        signal: "RED",
        action: "Reroute traffic",
        phase: 27
    },

    {
        id: "J-05",
        name: "Lake View",
        traffic: 29,
        vehicles: 31,
        signal: "GREEN",
        action: "Normal cycle",
        phase: 55
    },

    {
        id: "J-06",
        name: "Tech Park",
        traffic: 67,
        vehicles: 69,
        signal: "GREEN",
        action: "Extend green",
        phase: 44
    },

    {
        id: "J-07",
        name: "North Gate",
        traffic: 45,
        vehicles: 48,
        signal: "GREEN",
        action: "Normal cycle",
        phase: 52
    },

    {
        id: "J-08",
        name: "South Gate",
        traffic: 61,
        vehicles: 63,
        signal: "YELLOW",
        action: "Balance flow",
        phase: 39
    }

];


/* ================= INCIDENT DATA ================= */

let incidents = [

    {
        id: 1,
        type: "Accident",
        location: "Station Road",
        time: "4 min ago",
        severity: "High",
        status: "Open"
    },

    {
        id: 2,
        type: "Road Work",
        location: "Market & 2nd",
        time: "12 min ago",
        severity: "Medium",
        status: "Open"
    },

    {
        id: 3,
        type: "Slow Traffic",
        location: "Airport & Main",
        time: "19 min ago",
        severity: "Low",
        status: "Open"
    }

];


/* ================= HELPER ================= */

function $(id) {

    return document.getElementById(id);

}


/* ================= NAVIGATION ================= */

function showSection(id) {

    document
        .querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove("active");

        });


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove("active");

        });


    $(id).classList.add("active");


    const button =
        document.querySelector(
            `[data-section="${id}"]`
        );


    if (button) {

        button.classList.add("active");

    }


    if (id === "intersections") {

        renderIntersectionCards();

    }


    if (id === "incidents") {

        renderIncidents();

    }

}


document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.section
                );

            }
        );

    });


/* ================= TRAFFIC CLASS ================= */

function trafficClass(value) {

    if (value < 45) {

        return "low";

    }

    if (value < 70) {

        return "medium";

    }

    return "high";

}


/* ================= TRAFFIC TEXT ================= */

function trafficBadge(value) {

    if (value < 45) {

        return "Low";

    }

    if (value < 70) {

        return "Moderate";

    }

    return "Heavy";

}


/* ================= TABLE ================= */

function renderTable() {

    $("intersectionTable").innerHTML =

        intersections
            .slice(0, 6)
            .map(item => `

                <tr>

                    <td>
                        <b>${item.id}</b>
                        ${item.name}
                    </td>

                    <td>

                        <span class="badge b-${trafficClass(item.traffic)}">

                            ${trafficBadge(item.traffic)}

                        </span>

                    </td>

                    <td>

                        <span
                            class="signal ${item.signal.toLowerCase()}">

                            ● ${item.signal}

                        </span>

                    </td>

                    <td>
                        ${item.vehicles}
                    </td>

                    <td class="ai-action">

                        ${item.action}

                    </td>

                </tr>

            `)
            .join("");


    /* Update map colors */

    intersections.forEach(item => {

        const node =
            document.querySelector(
                `.map-node[data-id="${item.id}"]`
            );


        if (node) {

            node.className =
                `map-node ${trafficClass(item.traffic)}`;

        }

    });

}


/* ================= INTERSECTION CARDS ================= */

function renderIntersectionCards() {

    $("intersectionCards").innerHTML =

        intersections
            .map(item => `

                <div class="intersection-card">

                    <div class="ic-head">

                        <div>

                            <b>
                                ${item.id}
                            </b>

                            <p
                                style="
                                font-size:11px;
                                color:#8591a0;
                                margin-top:4px;
                                "
                            >

                                ${item.name}

                            </p>

                        </div>


                        <span
                            class="
                            badge
                            b-${trafficClass(item.traffic)}
                            "
                        >

                            ${trafficBadge(item.traffic)}

                        </span>

                    </div>


                    <small
                        style="
                        font-size:10px;
                        color:#8b96a4;
                        "
                    >

                        Congestion level

                    </small>


                    <div class="traffic-meter">

                        <i
                            style="
                            width:${item.traffic}%;
                            background:
                            ${
                                item.traffic < 45
                                ? "#22c55e"
                                : item.traffic < 70
                                ? "#f59e0b"
                                : "#ef4444"
                            };
                            "
                        ></i>

                    </div>


                    <div class="metric-row">

                        <span>
                            Vehicles/min
                        </span>

                        <b>
                            ${item.vehicles}
                        </b>

                    </div>


                    <div class="metric-row">

                        <span>
                            Signal
                        </span>

                        <b
                            class="
                            signal
                            ${item.signal.toLowerCase()}
                            "
                        >

                            ${item.signal}

                        </b>

                    </div>


                    <div class="metric-row">

                        <span>
                            Green phase
                        </span>

                        <b>
                            ${item.phase}s
                        </b>

                    </div>


                    <button
                        class="control-btn"
                        onclick="optimize('${item.id}')"
                    >

                        ⚡ Apply AI Optimization

                    </button>

                </div>

            `)
            .join("");

}


/* ================= INCIDENTS ================= */

function renderIncidents() {

    $("incidentList").innerHTML =

        incidents
            .map(item => `

                <div
                    class="incident"
                    id="incident-${item.id}"
                >

                    <div class="incident-icon">
                        ⚠️
                    </div>


                    <div class="incident-info">

                        <strong>

                            ${item.type}
                            —
                            ${item.location}

                        </strong>


                        <p>

                            ${item.time}
                            · Severity:
                            ${item.severity}

                        </p>

                    </div>


                    <span
                        class="
                        badge
                        b-${
                            item.severity === "High"
                            ? "high"
                            : item.severity === "Medium"
                            ? "medium"
                            : "low"
                        }
                        "
                    >

                        ${item.status}

                    </span>


                    ${
                        item.status === "Open"

                        ?

                        `
                        <button
                            class="resolve-btn"
                            onclick="
                            resolveIncident(${item.id})
                            "
                        >

                            Resolve

                        </button>
                        `

                        :

                        ""

                    }

                </div>

            `)
            .join("");


    /* Update incident count */

    const openIncidents =
        incidents.filter(
            item => item.status === "Open"
        ).length;


    $("incidentCount").textContent =
        openIncidents;


    const critical =
        incidents.some(
            item =>
                item.status === "Open" &&
                item.severity === "High"
        );


    $("incidentText").textContent =
        critical
        ? "1 requires attention"
        : "No critical incidents";

}


/* ================= AI RECOMMENDATIONS ================= */

function renderRecommendations() {

    const sorted =
        [...intersections]
            .sort(
                (a, b) =>
                    b.traffic - a.traffic
            );


    $("recommendations").innerHTML =

        sorted
            .slice(0, 3)
            .map(item => `

                <div class="rec">

                    <strong>

                        ⚡
                        ${item.id}:
                        ${item.action}

                    </strong>


                    <p>

                        Congestion is
                        ${item.traffic}%.
                        Adjust signal timing by
                        ${
                            item.traffic > 70
                            ? 12
                            : 8
                        }s to improve
                        traffic throughput.

                    </p>

                </div>

            `)
            .join("");

}


/* ================= AI OPTIMIZATION ================= */

function optimize(id) {

    const intersection =
        intersections.find(
            item => item.id === id
        );


    if (!intersection) {

        return;

    }


    /* Reduce congestion */

    intersection.traffic =
        Math.max(
            15,
            intersection.traffic - 7
        );


    /* Reduce vehicles */

    intersection.vehicles =
        Math.max(
            20,
            intersection.vehicles - 5
        );


    /* Increase green phase */

    intersection.phase =
        Math.min(
            75,
            intersection.phase + 8
        );


    intersection.action =
        "Optimized";


    renderTable();

    renderIntersectionCards();

    renderRecommendations();


    toast(
        `${id} signal timing optimized successfully`
    );

}


/* ================= RESOLVE INCIDENT ================= */

function resolveIncident(id) {

    const incident =
        incidents.find(
            item => item.id === id
        );


    if (!incident) {

        return;

    }


    incident.status =
        "Resolved";


    renderIncidents();


    toast(
        `${incident.type} at ${incident.location} resolved`
    );

}


/* ================= TOAST ================= */

function toast(message) {

    $("toast").textContent =
        message;


    $("toast").classList.add(
        "show"
    );


    setTimeout(() => {

        $("toast").classList.remove(
            "show"
        );

    }, 2200);

}


/* =========================================================
   CHARTS
   ========================================================= */


/* CONGESTION DATA */

let trendLabels = [
    "-60",
    "-50",
    "-40",
    "-30",
    "-20",
    "-10",
    "Now"
];


let trendData = [
    42,
    48,
    45,
    57,
    61,
    54,
    63
];


/* LINE CHART */

const trendChart =
    new Chart(
        $("trendChart"),
        {

            type: "line",

            data: {

                labels: trendLabels,

                datasets: [

                    {

                        label: "Congestion",

                        data: trendData,

                        borderWidth: 2,

                        tension: 0.4,

                        fill: true,

                        pointRadius: 3

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        min: 0,

                        max: 100

                    }

                }

            }

        }
    );


/* BAR CHART */

const barChart =
    new Chart(
        $("barChart"),
        {

            type: "bar",

            data: {

                labels: [
                    "Central",
                    "Market",
                    "Airport",
                    "Station",
                    "Lake",
                    "Tech Park"
                ],

                datasets: [

                    {

                        label: "Vehicles/min",

                        data: [
                            42,
                            76,
                            61,
                            91,
                            31,
                            69
                        ],

                        borderRadius: 5

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }

                },

                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        }
    );


/* DOUGHNUT CHART */

const doughnutChart =
    new Chart(
        $("doughnutChart"),
        {

            type: "doughnut",

            data: {

                labels: [
                    "Efficient",
                    "Optimization Needed"
                ],

                datasets: [

                    {

                        data: [
                            87,
                            13
                        ],

                        borderWidth: 0

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "72%",

                plugins: {

                    legend: {

                        position: "bottom"

                    }

                }

            }

        }
    );


/* =========================================================
   LIVE TRAFFIC SIMULATION
   ========================================================= */

function simulateTraffic() {

    intersections.forEach(item => {

        /*
        Generate random traffic change
        */

        const delta =
            Math.round(
                (Math.random() - 0.5) * 8
            );


        item.traffic =
            Math.max(
                10,
                Math.min(
                    95,
                    item.traffic + delta
                )
            );


        item.vehicles =
            Math.max(
                15,
                Math.min(
                    110,
                    item.vehicles +
                    Math.round(delta / 2)
                )
            );


        /* AI rule */

        if (item.traffic > 75) {

            item.action =
                "Reroute traffic";

        }

        else if (item.traffic > 60) {

            item.action =
                "Extend green";

        }

        else {

            item.action =
                "Normal cycle";

        }

    });


    /* TOTAL VEHICLES */

    const totalVehicles =
        intersections.reduce(
            (sum, item) =>
                sum + item.vehicles,
            0
        );


    $("vehicles").textContent =
        totalVehicles.toLocaleString();


    /* AVERAGE TRAVEL TIME */

    const averageTraffic =
        intersections.reduce(
            (sum, item) =>
                sum + item.traffic,
            0
        ) / intersections.length;


    const averageTime =
        14 + averageTraffic / 10;


    $("travelTime").textContent =
        averageTime.toFixed(1)
        + " min";


    /* UPDATE CHART */

    const currentCongestion =
        Math.round(
            averageTraffic
        );


    trendData.shift();

    trendData.push(
        currentCongestion
    );


    trendChart.update();


    /* UPDATE MAP */

    renderTable();

    renderRecommendations();


    /* NETWORK STATUS */

    if (currentCongestion > 70) {

        $("mapStatus").textContent =
            "Network flow: Heavy";

    }

    else if (currentCongestion > 55) {

        $("mapStatus").textContent =
            "Network flow: Moderate";

    }

    else {

        $("mapStatus").textContent =
            "Network flow: Normal";

    }

}


/* =========================================================
   LIVE CLOCK
   ========================================================= */

function updateClock() {

    const now =
        new Date();


    $("clock").textContent =
        now.toLocaleTimeString();

}


setInterval(
    updateClock,
    1000
);


updateClock();


/* =========================================================
   RUN TRAFFIC SIMULATION EVERY 4 SECONDS
   ========================================================= */

setInterval(
    simulateTraffic,
    4000
);


/* =========================================================
   CHART SELECTOR
   ========================================================= */

$("trendSelect")
    .addEventListener(
        "change",
        event => {

            const type =
                event.target.value;


            trendChart.data.datasets[0]
                .label = type;


            if (type === "Vehicles") {

                trendChart.data.datasets[0]
                    .data =
                    trendData.map(
                        value =>
                            Math.round(
                                value * 1.1
                            )
                    );

            }

            else {

                trendChart.data.datasets[0]
                    .data =
                    trendData;

            }


            trendChart.update();

        }
    );


/* =========================================================
   RESET
   ========================================================= */

$("resetBtn")
    .addEventListener(
        "click",
        () => {

            location.reload();

        }
    );


/* =========================================================
   INITIAL RENDER
   ========================================================= */

renderTable();

renderRecommendations();

renderIntersectionCards();

renderIncidents();