// KMJK PropertyOps - Main JavaScript Application

// Global State
let currentPage = 'overview';
let propertyData = {
    name: 'KMJK Property Management',
    client: 'PSR HOMES LLC',
    address: 'Multi-Property Portfolio Management',
    buildings: [
        {
            id: 'RS1',
            name: '4341 Riverside Dr',
            address: 'Coral Springs, FL 33065',
            units: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4'],
            unitDetails: ['2/1', '2/1', '2/1', '2/1'],
            floors: 1,
            type: '4-unit building'
        },
        {
            id: 'AL1',
            name: '624 Allen Ave',
            address: 'Delray Beach, FL 33483',
            units: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5'],
            unitDetails: ['2/1', '2/1', '2/1', '2/1', 'Efficiency'],
            floors: 2,
            type: '5-unit mixed building'
        },
        {
            id: 'NW1',
            name: '1853 NW 94th Ave',
            address: 'Coral Springs, FL 33071',
            units: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4'],
            unitDetails: ['2/2', '2/2', '2/2', '2/2'],
            floors: 2,
            type: '4-unit building'
        },
        {
            id: 'LM1',
            name: '1210 S M St',
            address: 'Lake Worth, FL 33460',
            units: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6', 'Unit 7', 'Unit 8', 'Unit 9'],
            unitDetails: ['1/1', '1/1', '1/1', '1/1', '1/1', '1/1', '1/1', '1/1', '1/1'],
            floors: 3,
            type: '9-unit building'
        }
    ],
    tickets: [],
    inspections: [],
    assets: [],
    vendors: [],
    staff: {
        owner: 'Josue',
        developer: 'Chris',
        technicians: ['Maintenance Tech', 'HVAC Vendor', 'Plumbing Vendor']
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadPage('overview');
    updateLastUpdated();
    setInterval(updateLastUpdated, 60000); // Update every minute
});

function initializeApp() {
    // Load sample data
    loadSampleData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize search
    setupSearch();
}

function loadSampleData() {
    // Sample buildings
    propertyData.buildings = [
        { id: 'B1', name: 'Building 1', units: ['101', '102', '103', '104', '201', '202', '203', '204'], floors: 2 },
        { id: 'B2', name: 'Building 2', units: ['101', '102', '103', '201', '202', '203'], floors: 2 },
        { id: 'B3', name: 'Building 3', units: ['101', '102', '103', '104', '105', '201', '202', '203', '204', '205'], floors: 2 }
    ];
    
    // Sample tickets
    propertyData.tickets = [
        {
            id: 'T001',
            priority: 'P1',
            category: 'flooring',
            building: 'AL1',
            unit: 'Unit 2',
            title: 'Five-Star Flooring - Complete unit renovation',
            description: 'Owner requested complete flooring replacement for Unit 2. Removing old carpet and installing new luxury vinyl plank throughout. This is priority project for owner investment.',
            status: 'in_progress',
            assignee: 'Josue',
            created: new Date('2026-01-08T10:00:00'),
            dueDate: new Date('2026-01-15T17:00:00'),
            estimatedCost: 3500,
            evidence: { photos: 8, videos: 2 },
            workSessions: [
                { date: new Date('2026-01-08T10:00:00'), hours: 4, notes: 'Removed old carpet, prepared subfloor' },
                { date: new Date('2026-01-09T09:00:00'), hours: 6, notes: 'Started vinyl plank installation - living room complete' }
            ],
            materials: [
                { item: 'Luxury Vinyl Plank', quantity: 500, unit: 'sq ft', cost: 2.50 },
                { item: 'Underlayment', quantity: 500, unit: 'sq ft', cost: 0.50 },
                { item: 'Transition strips', quantity: 3, unit: 'pieces', cost: 15.00 }
            ]
        },
        {
            id: 'T002',
            priority: 'P2',
            category: 'plumbing',
            building: 'RS1',
            unit: 'Unit 3',
            title: 'Kitchen sink drain replacement',
            description: 'Tenant reports slow draining sink, needs new P-trap and drain assembly',
            status: 'assigned',
            assignee: 'Maintenance Tech',
            created: new Date('2026-01-07T14:30:00'),
            dueDate: new Date('2026-01-10T12:00:00'),
            estimatedCost: 150,
            evidence: { photos: 2, videos: 0 }
        },
        {
            id: 'T003',
            priority: 'P0',
            category: 'electrical',
            building: 'NW1',
            unit: 'Unit 1',
            title: 'Breaker tripping frequently - potential fire hazard',
            description: 'Tenant reports kitchen breaker tripping multiple times daily. Could be overloaded circuit or faulty breaker.',
            status: 'new',
            assignee: '',
            created: new Date('2026-01-08T16:45:00'),
            dueDate: new Date('2026-01-09T09:00:00'),
            estimatedCost: 400,
            evidence: { photos: 1, videos: 0 }
        },
        {
            id: 'T004',
            priority: 'P2',
            category: 'hvac',
            building: 'LM1',
            unit: 'Unit 5',
            title: 'AC not cooling properly',
            description: 'Unit blowing warm air, tenant reports poor cooling during hot weather',
            status: 'assigned',
            assignee: 'HVAC Vendor',
            created: new Date('2026-01-06T09:15:00'),
            dueDate: new Date('2026-01-11T10:00:00'),
            estimatedCost: 300,
            evidence: { photos: 0, videos: 0 }
        }
    ];
    
    // Sample inspections
    propertyData.inspections = [
        {
            id: 'I001',
            type: 'Weekly Grounds Walkthrough',
            building: 'All Properties',
            status: 'completed',
            completedDate: new Date('2026-01-05T08:00:00'),
            score: 'Pass',
            nextDue: new Date('2026-01-12T08:00:00'),
            notes: 'All properties clean, minor trash issue at 624 Allen Ave resolved'
        },
        {
            id: 'I002',
            type: 'Monthly Building Envelope Check',
            building: '4341 Riverside Dr',
            status: 'scheduled',
            scheduledDate: new Date('2026-01-10T10:00:00'),
            score: null,
            nextDue: new Date('2026-01-10T10:00:00'),
            notes: 'Check roof, gutters, and exterior walls after recent rain'
        },
        {
            id: 'I003',
            type: 'Unit Turn Inspection',
            building: '624 Allen Ave',
            unit: 'Unit 2',
            status: 'completed',
            completedDate: new Date('2026-01-08T14:00:00'),
            score: 'Action Needed',
            nextDue: null,
            notes: 'Flooring project in progress - old carpet removed, subfloor prepared'
        }
    ];
    
    // Populate dropdowns
    populateBuildingDropdowns();
}

function setupEventListeners() {
    // Modal overlay clicks
    document.getElementById('modalOverlay').addEventListener('click', function() {
        closeAllModals();
    });
    
    // Search functionality
    document.getElementById('globalSearch').addEventListener('input', function(e) {
        performSearch(e.target.value);
    });
}

function setupSearch() {
    // Search is handled by the input event listener above
}

function populateBuildingDropdowns() {
    const buildingSelects = document.querySelectorAll('#ticketBuilding');
    buildingSelects.forEach(select => {
        select.innerHTML = '<option value="">Select Building</option>';
        propertyData.buildings.forEach(building => {
            const option = document.createElement('option');
            option.value = building.id;
            option.textContent = `${building.name} - ${building.address}`;
            select.appendChild(option);
        });
    });
    
    // Populate assignee dropdowns
    const assigneeSelects = document.querySelectorAll('#ticketAssignee');
    assigneeSelects.forEach(select => {
        select.innerHTML = '<option value="">Unassigned</option>';
        
        // Add owner
        const ownerOption = document.createElement('option');
        ownerOption.value = propertyData.staff.owner;
        ownerOption.textContent = `${propertyData.staff.owner} (Owner)`;
        select.appendChild(ownerOption);
        
        // Add technicians
        propertyData.staff.technicians.forEach(tech => {
            const techOption = document.createElement('option');
            techOption.value = tech;
            techOption.textContent = tech;
            select.appendChild(techOption);
        });
    });
}

// Navigation
function navigateTo(page) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    // Load page content
    loadPage(page);
    currentPage = page;
}

function loadPage(page) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '<div class="spinner"></div>';
    
    setTimeout(() => {
        switch(page) {
            case 'overview':
                loadOverviewPage();
                break;
            case 'map-buildings':
                loadMapBuildingsPage();
                break;
            case 'tickets':
                loadTicketsPage();
                break;
            case 'inspections':
                loadInspectionsPage();
                break;
            case 'storm-events':
                loadStormEventsPage();
                break;
            case 'assets':
                loadAssetsPage();
                break;
            case 'vendors':
                loadVendorsPage();
                break;
            case 'photos':
                loadPhotosPage();
                break;
            case 'reports':
                loadReportsPage();
                break;
            case 'hours':
                loadHoursPage();
                break;
            case 'settings':
                loadSettingsPage();
                break;
            default:
                loadOverviewPage();
        }
    }, 300);
}

// Page Loaders
function loadOverviewPage() {
    const mainContent = document.getElementById('mainContent');
    
    // Calculate metrics
    const openTickets = propertyData.tickets.filter(t => t.status !== 'completed').length;
    const p0Tickets = propertyData.tickets.filter(t => t.priority === 'P0').length;
    const activeLeaks = propertyData.tickets.filter(t => 
        t.category === 'plumbing' && (t.title.toLowerCase().includes('leak') || t.description.toLowerCase().includes('leak'))
    ).length;
    const inspectionsDue = propertyData.inspections.filter(i => 
        i.status === 'scheduled' && new Date(i.nextDue) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length;
    
    // Calculate hours used this week (from work sessions)
    let hoursUsedThisWeek = 0;
    propertyData.tickets.forEach(ticket => {
        if (ticket.workSessions) {
            ticket.workSessions.forEach(session => {
                const sessionDate = new Date(session.date);
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                if (sessionDate >= weekStart) {
                    hoursUsedThisWeek += session.hours;
                }
            });
        }
    });
    
    // Count vendor ETAs (tickets assigned to vendors)
    const vendorETAs = propertyData.tickets.filter(t => 
        t.assignee && (t.assignee.includes('Vendor') || t.assignee.includes('HVAC'))
    ).length;
    
    mainContent.innerHTML = `
        <div class="fade-in">
            <h1 class="page-title">Property Overview</h1>
            
            <!-- Status Tiles -->
            <div class="status-tiles">
                <div class="status-tile">
                    <div class="status-tile-number">${openTickets}</div>
                    <div class="status-tile-label">Open Tickets</div>
                </div>
                <div class="status-tile p0">
                    <div class="status-tile-number">${p0Tickets}</div>
                    <div class="status-tile-label">P0 Safety Issues</div>
                </div>
                <div class="status-tile p1">
                    <div class="status-tile-number">${activeLeaks}</div>
                    <div class="status-tile-label">Active Leaks</div>
                </div>
                <div class="status-tile p2">
                    <div class="status-tile-number">${inspectionsDue}</div>
                    <div class="status-tile-label">Inspections Due (7 days)</div>
                </div>
                <div class="status-tile">
                    <div class="status-tile-number">${hoursUsedThisWeek}</div>
                    <div class="status-tile-label">Hours Used This Week</div>
                </div>
                <div class="status-tile">
                    <div class="status-tile-number">${vendorETAs}</div>
                    <div class="status-tile-label">Vendor ETAs (72hrs)</div>
                </div>
            </div>
            
            <!-- Today's Plan -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Today's Plan</h2>
                    <p class="card-subtitle">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div class="card-body">
                    <div class="plan-section">
                        <h3>Assigned Tickets</h3>
                        <ul class="plan-list">
                            ${propertyData.tickets.filter(t => t.assignee && t.status !== 'completed').map(ticket => 
                                `<li><strong>${ticket.assignee}:</strong> ${ticket.id} - ${ticket.title} (${getBuildingName(ticket.building)} / ${ticket.unit})</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="plan-section">
                        <h3>Scheduled Vendor Visits</h3>
                        <ul class="plan-list">
                            ${propertyData.tickets.filter(t => t.assignee && (t.assignee.includes('Vendor') || t.assignee.includes('HVAC'))).map(ticket => 
                                `<li>${formatDate(ticket.dueDate)} - ${ticket.assignee}: ${getBuildingName(ticket.building)}/${ticket.unit} ${ticket.category}</li>`
                            ).join('')}
                        </ul>
                    </div>
                    <div class="plan-section">
                        <h3>Daily Operations Checklist</h3>
                        <ul class="checklist">
                            <li><input type="checkbox"> Morning grounds walkthrough</li>
                            <li><input type="checkbox"> Check dumpster areas</li>
                            <li><input type="checkbox"> Review new tickets</li>
                            <li><input type="checkbox"> Update work order status</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <!-- Recent Activity Feed -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Recent Activity</h2>
                    <p class="card-subtitle">Last 20 actions</p>
                </div>
                <div class="card-body">
                    <div class="activity-feed">
                        ${generateActivityFeed()}
                    </div>
                </div>
            </div>
            
            <!-- Hot Spots -->
            <div class="card">
                <div class="card-header">
                    <h2 class="card-title">Hot Spots</h2>
                    <p class="card-subtitle">Locations with repeat issues</p>
                </div>
                <div class="card-body">
                    <ul class="hot-spots-list">
                        ${generateHotSpots()}
                    </ul>
                </div>
            </div>
            
            <!-- Quick Actions -->
            <div class="quick-actions-grid">
                <button class="btn-primary btn-large" onclick="startDailyWalkthrough()">
                    <i class="fas fa-walking"></i> Start Daily Walkthrough
                </button>
                <button class="btn-secondary btn-large" onclick="startStormMode()">
                    <i class="fas fa-cloud-bolt"></i> Start Storm Mode
                </button>
                <button class="btn-secondary btn-large" onclick="createWeeklyReport()">
                    <i class="fas fa-file-pdf"></i> Create Weekly Owner Report
                </button>
            </div>
        </div>
    `;
}

function loadMapBuildingsPage() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="fade-in">
            <h1 class="page-title">Map & Buildings</h1>
            
            <div class="map-view">
                <div class="map-placeholder">
                    <i class="fas fa-map-marked-alt"></i>
                    <p>KMJK Property Management - PSR HOMES LLC Portfolio</p>
                    <small>4 Properties across Broward and Palm Beach Counties</small>
                </div>
            </div>
            
            <div class="buildings-list">
                ${propertyData.buildings.map(building => `
                    <div class="building-card" onclick="openBuildingProfile('${building.id}')">
                        <h3>${building.name}</h3>
                        <p>${building.address}</p>
                        <p>${building.units.length} units (${building.type}) • ${building.floors} floors</p>
                        <div class="building-status">
                            <span class="status-indicator ${getBuildingStatus(building.id)}">${getBuildingStatusText(building.id)}</span>
                        </div>
                        <div class="building-issues">
                            ${getBuildingIssues(building.id)}
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="developer-credit">
                <p><small>Dashboard developed by Chris for KMJK Property Management</small></p>
            </div>
        </div>
    `;
}

function loadTicketsPage() {
    const mainContent = document.getElementById('mainContent');
    
    const ticketsByStatus = {
        new: propertyData.tickets.filter(t => t.status === 'new'),
        assigned: propertyData.tickets.filter(t => t.status === 'assigned'),
        in_progress: propertyData.tickets.filter(t => t.status === 'in_progress'),
        waiting: propertyData.tickets.filter(t => t.status === 'waiting'),
        completed: propertyData.tickets.filter(t => t.status === 'completed')
    };
    
    mainContent.innerHTML = `
        <div class="fade-in">
            <div class="page-header">
                <h1 class="page-title">Tickets</h1>
                <div class="view-controls">
                    <select id="ticketView">
                        <option value="kanban">Kanban Board</option>
                        <option value="list">List View</option>
                        <option value="grouped">Group by Building</option>
                    </select>
                </div>
            </div>
            
            <div class="kanban-board">
                <div class="kanban-column">
                    <h3>New <span class="count">${ticketsByStatus.new.length}</span></h3>
                    <div class="tickets-container">
                        ${ticketsByStatus.new.map(ticket => createTicketCard(ticket)).join('')}
                    </div>
                </div>
                <div class="kanban-column">
                    <h3>Assigned <span class="count">${ticketsByStatus.assigned.length}</span></h3>
                    <div class="tickets-container">
                        ${ticketsByStatus.assigned.map(ticket => createTicketCard(ticket)).join('')}
                    </div>
                </div>
                <div class="kanban-column">
                    <h3>In Progress <span class="count">${ticketsByStatus.in_progress.length}</span></h3>
                    <div class="tickets-container">
                        ${ticketsByStatus.in_progress.map(ticket => createTicketCard(ticket)).join('')}
                    </div>
                </div>
                <div class="kanban-column">
                    <h3>Waiting <span class="count">${ticketsByStatus.waiting.length}</span></h3>
                    <div class="tickets-container">
                        ${ticketsByStatus.waiting.map(ticket => createTicketCard(ticket)).join('')}
                    </div>
                </div>
                <div class="kanban-column">
                    <h3>Completed <span class="count">${ticketsByStatus.completed.length}</span></h3>
                    <div class="tickets-container">
                        ${ticketsByStatus.completed.map(ticket => createTicketCard(ticket)).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadInspectionsPage() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="fade-in">
            <h1 class="page-title">Inspections</h1>
            
            <div class="inspections-grid">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Scheduled Inspections</h2>
                    </div>
                    <div class="card-body">
                        ${propertyData.inspections.filter(i => i.status === 'scheduled').map(inspection => `
                            <div class="inspection-item">
                                <h4>${inspection.type}</h4>
                                <p>Building: ${inspection.building}</p>
                                <p>Scheduled: ${formatDate(inspection.scheduledDate)}</p>
                                <button class="btn-primary" onclick="startInspection('${inspection.id}')">Start Inspection</button>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Recent Inspections</h2>
                    </div>
                    <div class="card-body">
                        ${propertyData.inspections.filter(i => i.status === 'completed').map(inspection => `
                            <div class="inspection-item">
                                <h4>${inspection.type}</h4>
                                <p>Building: ${inspection.building}</p>
                                <p>Completed: ${formatDate(inspection.completedDate)}</p>
                                <p>Score: <span class="score-badge ${inspection.score.toLowerCase()}">${inspection.score}</span></p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper Functions
function createTicketCard(ticket) {
    const building = propertyData.buildings.find(b => b.id === ticket.building);
    const buildingName = building ? building.name : ticket.building;
    
    return `
        <div class="ticket-card priority-${ticket.priority}" onclick="openTicketDetail('${ticket.id}')">
            <div class="ticket-header">
                <span class="priority-badge ${ticket.priority}">${ticket.priority}</span>
                <span class="ticket-category">${ticket.category}</span>
            </div>
            <div class="ticket-content">
                <h4>${ticket.title}</h4>
                <p class="ticket-location">${buildingName} / ${ticket.unit}</p>
                <p class="ticket-assignee">${ticket.assignee || 'Unassigned'}</p>
                ${ticket.estimatedCost ? `<p class="ticket-cost">Est: $${ticket.estimatedCost}</p>` : ''}
            </div>
            <div class="ticket-footer">
                <span class="ticket-date">${formatDate(ticket.created)}</span>
                <span class="evidence-count">
                    📷 ${ticket.evidence.photos} 🎥 ${ticket.evidence.videos}
                </span>
            </div>
        </div>
    `;
}

function generateActivityFeed() {
    const activities = [
        { type: 'ticket', title: 'New ticket created: T001 - Active ceiling leak', time: '2 hours ago', user: 'System' },
        { type: 'inspection', title: 'Weekly grounds walkthrough completed', time: '4 hours ago', user: 'John Smith' },
        { type: 'upload', title: '3 photos uploaded to T001', time: '5 hours ago', user: 'John Smith' },
        { type: 'ticket', title: 'T003 assigned to Mike Johnson', time: '6 hours ago', user: 'Admin' },
        { type: 'inspection', title: 'Monthly building envelope check scheduled', time: '1 day ago', user: 'System' }
    ];
    
    return activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${getIconForActivity(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-meta">${activity.time} • ${activity.user}</div>
            </div>
        </div>
    `).join('');
}

function getIconForActivity(type) {
    const icons = {
        ticket: 'ticket-alt',
        inspection: 'clipboard-check',
        upload: 'upload'
    };
    return icons[type] || 'circle';
}

function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
}

function updateLastUpdated() {
    const lastUpdated = document.getElementById('lastUpdated');
    lastUpdated.textContent = 'Just now';
}

// Modal Functions
function showNewTicketModal() {
    document.getElementById('newTicketModal').classList.add('active');
    document.getElementById('modalOverlay').classList.add('active');
}

function showNewInspectionModal() {
    alert('New Inspection modal - to be implemented');
}

function showUploadModal() {
    alert('Upload modal - to be implemented');
}

function showExportModal() {
    alert('Export modal - to be implemented');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.getElementById('modalOverlay').classList.remove('active');
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
    document.getElementById('modalOverlay').classList.remove('active');
}

// Action Functions
function createTicket() {
    const form = document.getElementById('newTicketForm');
    const formData = new FormData(form);
    
    const newTicket = {
        id: 'T' + String(propertyData.tickets.length + 1).padStart(3, '0'),
        priority: document.getElementById('ticketPriority').value,
        category: document.getElementById('ticketCategory').value,
        building: document.getElementById('ticketBuilding').value,
        unit: document.getElementById('ticketUnit').value,
        title: document.getElementById('ticketTitle').value,
        description: document.getElementById('ticketDescription').value,
        status: 'new',
        assignee: document.getElementById('ticketAssignee').value,
        created: new Date(),
        evidence: { photos: 0, videos: 0 }
    };
    
    propertyData.tickets.push(newTicket);
    closeModal('newTicketModal');
    
    // Show success message
    showNotification('Ticket created successfully!', 'success');
    
    // Reload current page to show new ticket
    loadPage(currentPage);
}

function openTicketDetail(ticketId) {
    const ticket = propertyData.tickets.find(t => t.id === ticketId);
    if (ticket) {
        const building = propertyData.buildings.find(b => b.id === ticket.building);
        const buildingName = building ? `${building.name} - ${building.address}` : ticket.building;
        
        let detailHTML = `
            <div class="ticket-detail">
                <div class="ticket-detail-header">
                    <h2>${ticket.id} - ${ticket.title}</h2>
                    <div class="ticket-meta">
                        <span class="priority-badge ${ticket.priority}">${ticket.priority}</span>
                        <span class="ticket-category">${ticket.category}</span>
                        <span class="ticket-status">${ticket.status}</span>
                    </div>
                </div>
                
                <div class="ticket-detail-content">
                    <div class="ticket-info">
                        <h3>Location</h3>
                        <p><strong>${buildingName}</strong></p>
                        <p>Unit: ${ticket.unit}</p>
                        
                        <h3>Description</h3>
                        <p>${ticket.description}</p>
                        
                        <h3>Assignment</h3>
                        <p>Assigned to: ${ticket.assignee || 'Unassigned'}</p>
                        <p>Created: ${formatDate(ticket.created)}</p>
                        <p>Due: ${formatDate(ticket.dueDate)}</p>
                        ${ticket.estimatedCost ? `<p>Estimated Cost: $${ticket.estimatedCost}</p>` : ''}
                    </div>
                    
                    <div class="ticket-evidence">
                        <h3>Evidence</h3>
                        <p>📷 ${ticket.evidence.photos} photos • 🎥 ${ticket.evidence.videos} videos</p>
                    </div>
                    
                    ${ticket.workSessions ? `
                        <div class="ticket-work-sessions">
                            <h3>Work Sessions</h3>
                            ${ticket.workSessions.map(session => `
                                <div class="work-session">
                                    <p><strong>${formatDate(session.date)}</strong> - ${session.hours} hours</p>
                                    <p>${session.notes}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                    
                    ${ticket.materials ? `
                        <div class="ticket-materials">
                            <h3>Materials</h3>
                            <table class="materials-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Quantity</th>
                                        <th>Unit Cost</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${ticket.materials.map(material => `
                                        <tr>
                                            <td>${material.item}</td>
                                            <td>${material.quantity} ${material.unit}</td>
                                            <td>$${material.cost}</td>
                                            <td>$${(material.quantity * material.cost).toFixed(2)}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    ` : ''}
                </div>
                
                <div class="ticket-actions">
                    <button class="btn-primary" onclick="editTicket('${ticket.id}')">Edit Ticket</button>
                    <button class="btn-secondary" onclick="closeTicketDetail()">Close</button>
                </div>
            </div>
        `;
        
        // Show in modal or new page
        showModal('Ticket Detail', detailHTML);
    }
}

function openBuildingProfile(buildingId) {
    const building = propertyData.buildings.find(b => b.id === buildingId);
    if (building) {
        alert(`Building Profile for ${building.name}\n\nThis would open detailed building information with:\n- Summary tab\n- Units list\n- Systems information\n- History timeline`);
    }
}

function startInspection(inspectionId) {
    alert(`Starting inspection ${inspectionId}\n\nThis would open a mobile-friendly checklist interface with:\n- Checkbox-driven items\n- Photo attachment\n- Ticket creation\n- Scoring system`);
}

function startDailyWalkthrough() {
    alert('Starting Daily Walkthrough\n\nThis would open the grounds/trash inspection checklist.');
}

function startStormMode() {
    alert('Storm Mode Activated\n\nThis would open the Storm Events command center.');
}

function createWeeklyReport() {
    alert('Creating Weekly Owner Report\n\nThis would generate a PDF report with:\n- Ticket summary\n- Key photos\n- Recurring issues\n- Preventive maintenance status');
}

function performSearch(query) {
    if (query.length < 2) return;
    
    // Search across tickets, inspections, assets
    const results = {
        tickets: propertyData.tickets.filter(t => 
            t.title.toLowerCase().includes(query.toLowerCase()) ||
            t.description.toLowerCase().includes(query.toLowerCase())
        ),
        inspections: propertyData.inspections.filter(i =>
            i.type.toLowerCase().includes(query.toLowerCase())
        )
    };
    
    console.log('Search results:', results);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--teal)' : 'var(--gray)'};
        color: white;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Additional helper functions
function getBuildingName(buildingId) {
    const building = propertyData.buildings.find(b => b.id === buildingId);
    return building ? building.name : buildingId;
}

function getBuildingStatus(buildingId) {
    const tickets = propertyData.tickets.filter(t => t.building === buildingId && t.status !== 'completed');
    if (tickets.some(t => t.priority === 'P0')) return 'critical';
    if (tickets.some(t => t.priority === 'P1')) return 'warning';
    return 'ok';
}

function getBuildingStatusText(buildingId) {
    const status = getBuildingStatus(buildingId);
    const statusTexts = {
        'critical': 'Critical Issues',
        'warning': 'Attention Needed', 
        'ok': 'All Clear'
    };
    return statusTexts[status];
}

function getBuildingIssues(buildingId) {
    const tickets = propertyData.tickets.filter(t => t.building === buildingId && t.status !== 'completed');
    if (tickets.length === 0) return '<span class="no-issues">No active issues</span>';
    
    return `
        <div class="issues-summary">
            <span class="issue-count">${tickets.length} active issue${tickets.length > 1 ? 's' : ''}</span>
            ${tickets.some(t => t.priority === 'P0') ? '<span class="critical-indicator">⚠️ P0</span>' : ''}
        </div>
    `;
}

function generateHotSpots() {
    // Analyze tickets for repeat issues
    const issuesByLocation = {};
    
    propertyData.tickets.forEach(ticket => {
        const location = `${getBuildingName(ticket.building)} / ${ticket.unit}`;
        if (!issuesByLocation[location]) {
            issuesByLocation[location] = [];
        }
        issuesByLocation[location].push(ticket);
    });
    
    const hotSpots = Object.entries(issuesByLocation)
        .filter(([location, tickets]) => tickets.length > 1)
        .map(([location, tickets]) => {
            const categories = [...new Set(tickets.map(t => t.category))];
            return `<li><strong>${location}:</strong> ${categories.join(', ')} issues (${tickets.length} incidents)</li>`;
        });
    
    if (hotSpots.length === 0) {
        return '<li>No repeat issues detected</li>';
    }
    
    return hotSpots.join('');
}

function showModal(title, content) {
    // Create a custom modal for detailed views
    const modalHTML = `
        <div id="customModal" class="modal active" style="max-width: 800px; max-height: 90vh;">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="close-btn" onclick="closeModal('customModal')">&times;</button>
            </div>
            <div class="modal-body" style="max-height: 70vh; overflow-y: auto;">
                ${content}
            </div>
        </div>
    `;
    
    // Add modal to body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer.firstElementChild);
    document.getElementById('modalOverlay').classList.add('active');
}

function closeTicketDetail() {
    closeModal('customModal');
}

function editTicket(ticketId) {
    alert(`Edit ticket ${ticketId} - This would open the edit form`);
}
function loadStormEventsPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Storm Events</h1><p>Storm command center - to be implemented</p>';
}

function loadAssetsPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Assets & Systems</h1><p>Asset tracking - to be implemented</p>';
}

function loadVendorsPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Vendors</h1><p>Vendor management - to be implemented</p>';
}

function loadPhotosPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Photos & Files</h1><p>Evidence library - to be implemented</p>';
}

function loadReportsPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Reports & Exports</h1><p>Report generation - to be implemented</p>';
}

function loadHoursPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Hours & Billing</h1><p>Time tracking - to be implemented</p>';
}

function loadSettingsPage() {
    document.getElementById('mainContent').innerHTML = '<h1>Settings</h1><p>Admin settings - to be implemented</p>';
}
