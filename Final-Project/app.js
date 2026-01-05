/* AquaEduGame — Fully Developed Prototype
   app.js
   - Includes better UX, Accessibility (ARIA updates), and robust data handling.
*/

// ---------- Data ----------
const SPECIES = [
    { id:'tilapia', name:'Nile Tilapia (Oreochromis niloticus)', ph:{min:6.5,max:8.5}, temp:{min:24,max:30}, depth:{min:0.5,max:2.0}, feed:'Commercial pellets', notes:'Common in earthen ponds — tolerant.'},
    { id:'catfish', name:'Catfish (Clarias spp.)', ph:{min:6.5,max:8.5}, temp:{min:26,max:32}, depth:{min:0.5,max:2.0}, feed:'Pellets, trash fish', notes:'Hardy, fast-growing.'},
    { id:'milkfish', name:'Milkfish (Chanos chanos)', ph:{min:7.5,max:8.5}, temp:{min:26,max:30}, depth:{min:0.5,max:3.0}, feed:'Omnivorous pellets', notes:'Important for brackish culture.'},
    { id:'shrimp', name:'Penaeid Shrimp (Litopenaeus vannamei)', ph:{min:7.8,max:8.5}, temp:{min:28,max:32}, depth:{min:0.8,max:2.5}, feed:'High protein pellets', notes:'Requires strict salinity & water quality.'},
    { id:'rabbitfish', name:'Rabbitfish (Siganus spp.)', ph:{min:7.5,max:8.5}, temp:{min:25,max:30}, depth:{min:0.5,max:3.0}, feed:'Seaweeds, formulated diets', notes:'Good for cage culture.'},
    { id:'commoncarp', name:'Common Carp (Cyprinus carpio)', ph:{min:6.5,max:8.0}, temp:{min:18,max:28}, depth:{min:0.6,max:2.5}, feed:'Omnivorous feed', notes:'Cold tolerant, polyculture.'},
    { id:'tilapiaj', name:'Red Tilapia', ph:{min:6.5,max:8.5}, temp:{min:24,max:30}, depth:{min:0.5,max:2.0}, feed:'Commercial pellets', notes:'Color variant used in markets.'},
    { id:'pangasius', name:'Pangasius (Pangasius sutchi)', ph:{min:6.5,max:8.5}, temp:{min:22,max:30}, depth:{min:1.0,max:3.0}, feed:'High protein pellets', notes:'Popular for grow-out ponds.'},
    { id:'koi', name:'Koi (Cyprinus carpio var.)', ph:{min:7.0,max:8.0}, temp:{min:18,max:28}, depth:{min:0.5,max:2.0}, feed:'Ornamental fish feed', notes:'Ornamental, sensitive to water quality.'},
    { id:'mudcrab', name:'Mud Crab (Scylla serrata)', ph:{min:7.5,max:8.5}, temp:{min:25,max:30}, depth:{min:0.5,max:3.0}, feed:'High protein feed', notes:'Requires brackish conditions.'},
    { id:'carpgrass', name:'Grass Carp (Ctenopharyngodon idella)', ph:{min:6.5,max:8.0}, temp:{min:20,max:28}, depth:{min:0.6,max:2.5}, feed:'Herbivorous feed', notes:'Used for aquatic weed control.'},
    { id:'trout', name:'Rainbow Trout (Oncorhynchus mykiss)', ph:{min:6.5,max:8.0}, temp:{min:10,max:18}, depth:{min:0.6,max:2.5}, feed:'Cold-water pellets', notes:'Cold water specialist.'}
];

// ---------- Utilities ----------
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const LS = window.localStorage;

// ---------- State & Persistence ----------
// Define initial state and ensure persistence utilities are clean
let state = {
    user: JSON.parse(LS.getItem('aqua_user') || 'null'), 
    points: Number(LS.getItem('aqua_points') || 0),
    level: Number(LS.getItem('aqua_level') || 1),
    badges: JSON.parse(LS.getItem('aqua_badges') || '[]'),
    studyList: JSON.parse(LS.getItem('aqua_study') || '[]'),
    history: JSON.parse(LS.getItem('aqua_history') || '[]'), 
    roster: JSON.parse(LS.getItem('aqua_roster') || '[]') 
};

function persist() {
    LS.setItem('aqua_user', JSON.stringify(state.user));
    LS.setItem('aqua_points', state.points);
    LS.setItem('aqua_level', state.level);
    LS.setItem('aqua_badges', JSON.stringify(state.badges));
    LS.setItem('aqua_study', JSON.stringify(state.studyList));
    LS.setItem('aqua_history', JSON.stringify(state.history));
    LS.setItem('aqua_roster', JSON.stringify(state.roster));
}

// ensure we have sample roster for teacher view
if(state.roster.length===0){
    state.roster = [
        {name:'Alice Santos', points:120, level:2, id: 's1'},
        {name:'Ben Cruz', points:45, level:1, id: 's2'},
        {name:'Carla Reyes', points:210, level:3, id: 's3'},
    ];
    persist();
}

// ---------- Toast/Notification System ----------
function showToast(message, type='info') {
    const container = $('#toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('fading-out');
        toast.addEventListener('transitionend', () => toast.remove());
    }, 3000);
}

// (CSS required for .toast to work, adding a basic one for context):
/* .toast-container { position: fixed; bottom: 20px; right: 20px; z-index: 1001; }
.toast { background: #333; color: white; padding: 10px 15px; border-radius: 8px; margin-top: 10px; opacity: 1; transition: opacity 0.5s ease; }
.toast.fading-out { opacity: 0; }
.toast.success { background: #4caf50; }
.toast.error { background: #f44336; } 
*/


// ---------- Init ----------
document.addEventListener('DOMContentLoaded', ()=>{
    wireNav();
    renderSpeciesList();
    wireSearch();
    populateSimSpecies();
    wireSimControls();
    renderChallenges();
    renderProfile();
    renderAnalytics();
    renderRoster();
    updateUserUI();
    bindGlobalButtons();
    wireLessons();
    // Default to species section
    showSection('species-section');
});

// ---------- NAV ----------
function wireNav(){
    $$('.nav-btn').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            $$('.nav-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            const tgt = btn.dataset.target || btn.getAttribute('data-target');
            showSection(tgt);
        });
    });
}
function showSection(id){
    $$('.panel').forEach(p=>p.classList.add('hidden'));
    const el = $(`#${id}`);
    if(el) el.classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
}

// ---------- LOGIN (local demo) ----------
function bindGlobalButtons(){
    $('#btn-login').addEventListener('click', showLoginModal);
    $('#btn-start-etam') && $('#btn-start-etam').addEventListener('click', showETAMModal);
    $('#export-csv').addEventListener('click', exportCSV);
    $('#reset-data').addEventListener('click', resetAllData);
    $('#teacher-btn').addEventListener('click', ()=>showSection('teacher-section'));
    $('#user-badge').addEventListener('click', ()=> showLoginModal());
    $('#theme-toggle').addEventListener('click', toggleTheme);
}
function updateUserUI(){
    const u = state.user;
    $('#user-badge').textContent = u ? `${u.name} (${u.role})` : 'Guest';
    if(u && u.role==='teacher'){
        $('#teacher-btn').classList.remove('hidden');
    } else {
        $('#teacher-btn').classList.add('hidden');
    }
    $('#profile-name').textContent = u ? u.name : 'Guest Learner';
}
function showLoginModal(){
    const root = $('#modal-root');
    root.innerHTML = `
        <div class="modal" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-heading">
          <div class="modal-card">
            <button class="btn-close" id="close-login" aria-label="Close dialog">&times;</button>
            <h3 id="login-heading">Sign in (Demo)</h3>
            <p class="muted">Choose a role to simulate Student or Teacher workflows. No server — local only.</p>
            <div style="margin-top:12px">
              <input id="login-name" placeholder="Your name" value="${state.user ? state.user.name : ''}" style="padding:10px;width:100%;border-radius:8px;border:1px solid #ccc"/>
              <div style="display:flex;gap:10px;margin-top:15px">
                <select id="login-role" style="padding:10px;border-radius:8px;border:1px solid #ccc; flex-grow: 1;">
                  <option value="student" ${state.user && state.user.role === 'student' ? 'selected' : ''}>Student</option>
                  <option value="teacher" ${state.user && state.user.role === 'teacher' ? 'selected' : ''}>Teacher</option>
                </select>
                <button id="do-login" class="btn primary">Sign In</button>
              </div>
            </div>
          </div>
        </div>
    `;
    $('#close-login').addEventListener('click', ()=>root.innerHTML='');
    $('#do-login').addEventListener('click', ()=>{
        const name = $('#login-name').value.trim() || 'Learner';
        const role = $('#login-role').value;
        state.user = {name, role, id: name.toLowerCase().replace(/\s/g, '_')}; // Use sanitized name as ID
        
        if (role === 'student' && !state.roster.some(r => r.name === name)) {
            state.roster.push({name, points: state.points, level: state.level, id: state.user.id});
        }
        
        persist();
        updateUserUI();
        root.innerHTML='';
        showToast(`Signed in as ${name} (${role}) — demo mode`, 'success');
        renderRoster(); // Update roster if a new student logged in
    });
}

// ---------- SPECIES LIST & DETAIL ----------
function renderSpeciesList(filter=''){
    const list = $('#species-list');
    list.innerHTML = '';
    const f = filter.trim().toLowerCase();
    
    // Filtering logic remains the same
    const filteredSpecies = SPECIES.filter(s => s.name.toLowerCase().includes(f) || s.id.includes(f));
    
    if (filteredSpecies.length === 0) {
        list.innerHTML = '<p class="muted" style="grid-column: 1 / -1; text-align: center;">No species found matching your search.</p>';
        return;
    }

    filteredSpecies.forEach(sp=>{
        const card = document.createElement('div');
        card.className = 'spec-card';
        card.setAttribute('role', 'listitem');
        card.innerHTML = `
            <h4><i class="fas fa-fish"></i> ${sp.name}</h4>
            <p class="muted">${sp.notes}</p>
            <div class="spec-row">
                <div style="font-size:0.95rem"><strong>pH</strong> ${sp.ph.min}-${sp.ph.max} • <strong>Temp</strong> ${sp.temp.min}-${sp.temp.max}°C</div>
                <div>
                    <button class="small view-spec" data-id="${sp.id}" aria-label="View details for ${sp.name}">View</button>
                </div>
            </div>
        `;
        list.appendChild(card);
    });
    // Wire click events using delegation for better performance in larger lists is recommended, 
    // but for simplicity, the existing direct assignment is kept:
    $$('.view-spec').forEach(b=>b.addEventListener('click', e=>{
        showSpeciesDetail(e.currentTarget.dataset.id);
    }));
}
function wireSearch(){
    $('#search-species').addEventListener('input', (e)=> renderSpeciesList(e.target.value));
}
function showSpeciesDetail(id){
    const sp = SPECIES.find(s=>s.id===id);
    if(!sp) return;
    
    // Generate modal HTML and insert into modal-root
    const modalHTML = `
        <div id="species-detail-modal" class="modal" role="dialog" aria-modal="true" aria-labelledby="sd-name-heading">
            <div class="modal-card">
                <button id="close-detail" class="btn btn-close" aria-label="Close species detail">&times;</button>
                <div class="detail-grid">
                    <div class="detail-left">
                        <h3 id="sd-name-heading">${sp.name}</h3>
                        <p id="sd-notes">${sp.notes}</p>
                        <ul class="specs">
                            <li><strong>Optimal pH:</strong> <span>${sp.ph.min} - ${sp.ph.max}</span></li>
                            <li><strong>Temp (°C):</strong> <span>${sp.temp.min} - ${sp.temp.max}</span></li>
                            <li><strong>Depth (m):</strong> <span>${sp.depth.min} - ${sp.depth.max}</span></li>
                            <li><strong>Feed:</strong> <span>${sp.feed || '—'}</span></li>
                        </ul>
                        <h4>Habitat and Notes:</h4>
                        <p class="muted">${sp.notes}. This species thrives in the recommended ranges, though factors like dissolved oxygen and salinity (where applicable) are also vital.</p>
                    </div>
                    <div class="detail-right">
                        <div class="placeholder-img"><i class="fas fa-image"></i> Image Placeholder</div>
                        <div class="actions">
                            <button id="btn-sim-from-detail" class="btn primary"><i class="fas fa-sliders-h"></i> Simulate Conditions</button>
                            <button id="btn-favorite" class="btn btn-secondary"><i class="fas fa-bookmark"></i> Add to Study List</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    $('#modal-root').innerHTML = modalHTML;
    
    // Wire up the dynamic buttons within the new modal
    $('#close-detail').addEventListener('click', ()=> $('#modal-root').innerHTML='');
    
    $('#btn-sim-from-detail').onclick = ()=>{
        $('#modal-root').innerHTML='';
        state.currentSpecies = id;
        populateSimSpecies(id);
        showSection('sim-section');
        showToast(`Simulation started for ${sp.name}.`, 'info');
    };
    
    $('#btn-favorite').onclick = ()=>{
        if(state.studyList.includes(id)){
            state.studyList = state.studyList.filter(s => s !== id);
            showToast('Removed from study list.', 'info');
        } else {
            state.studyList.push(id); 
            showToast('Added to your study list.', 'success');
        }
        persist(); 
        renderProfile();
    };
}


// ---------- SIMULATOR ----------
function updateRangeLabelAndAria(e, labelId, unit=''){
    const val = e.target.value;
    $(labelId).textContent = val;
    e.target.setAttribute('aria-valuetext', `Current value is ${val} ${unit}`);
}
function wireSimControls(){
    // Updated to use the utility function for A11Y update
    $('#control-ph').addEventListener('input', e => updateRangeLabelAndAria(e, '#val-ph'));
    $('#control-temp').addEventListener('input', e => updateRangeLabelAndAria(e, '#val-temp', 'degrees Celsius'));
    $('#control-depth').addEventListener('input', e => updateRangeLabelAndAria(e, '#val-depth', 'meters'));
    
    $('#btn-run').addEventListener('click', runSimulation);
    $('#btn-reset').addEventListener('click', ()=> {
        resetSimControlsToSpecies(state.currentSpecies);
        showToast('Simulation controls reset.', 'info');
    });
}
// ... (rest of the simulator logic, computeSuitability, runSimulation, remains the same)

// scoring algorithm: improved with gentle penalties (same as original)
function scoreParam(val, min, max){
    if(val >= min && val <= max) return 100;
    const range = Math.max(0.0001, max - min);
    const diff = val < min ? (min - val) : (val - max);
    const penalty = Math.min(diff / (range*0.5), 1);
    return Math.round((1 - penalty)*100);
}
function computeSuitability(species, ph, temp, depth){
    const s1 = scoreParam(ph, species.ph.min, species.ph.max);
    const s2 = scoreParam(temp, species.temp.min, species.temp.max);
    const s3 = scoreParam(depth, species.depth.min, species.depth.max);
    // weighted: temp 40, ph 35, depth 25
    const total = Math.round((s2*0.4)+(s1*0.35)+(s3*0.25));
    return {total, s1, s2, s3};
}

function runSimulation(){
    if (!state.user) {
        showToast('Please sign in to run simulations and save progress.', 'error');
        showLoginModal();
        return;
    }
    
    const sp = SPECIES.find(s=>s.id===state.currentSpecies);
    const ph = parseFloat($('#control-ph').value);
    const temp = parseFloat($('#control-temp').value);
    const depth = parseFloat($('#control-depth').value);
    const res = computeSuitability(sp, ph, temp, depth);
    
    $('#score').textContent = `${res.total}/100`;
    $('#score').style.color = res.total >= 85 ? 'var(--secondary)' : (res.total >= 65 ? 'orange' : 'var(--danger)'); // Visual score feedback
    
    let rec = '';
    let points = 0;
    if(res.total >= 85){
        rec = 'Excellent — conditions ideal. Max points awarded!';
        badgeAward('Water Master');
        points = 25;
    } else if(res.total >= 65){
        rec = 'Good — minor tuning recommended (Check parameters below).';
        points = 12;
    } else if(res.total >= 40){
        rec = 'Marginal — moderate changes needed to ensure survival.';
        points = 6;
    } else {
        rec = 'Critical! Conditions are Unsuitable — major revision required.';
        points = 2;
    }
    
    pointsAdd(points); // Add points *before* toast
    showToast(`Simulation Run: Scored ${res.total}. +${points} points awarded.`, 'success');
    
    $('#recommendation').textContent = rec;
    $('#param-breakdown').innerHTML = `
        <div class="badge ${res.s1 < 60 ? 'badge-danger' : ''}">pH: ${res.s1}/100</div>
        <div class="badge ${res.s2 < 60 ? 'badge-danger' : ''}">Temp: ${res.s2}/100</div>
        <div class="badge ${res.s3 < 60 ? 'badge-danger' : ''}">Depth: ${res.s3}/100</div>
    `;
    
    // save history
    const entry = {user: state.user.name, userId: state.user.id, species: sp.id, speciesName: sp.name, score: res.total, date: new Date().toISOString()};
    state.history.push(entry);
    
    persist();
    renderProfile();
    renderAnalytics();
    renderRoster();
}


// ---------- GAMIFICATION & UI Rendering ----------
function pointsAdd(n){
    if (!state.user) return; // Only award points if signed in
    state.points += n;
    
    const pointsRequiredForNextLevel = 100;
    const newLevel = Math.floor(state.points / pointsRequiredForNextLevel) + 1;
    
    if(newLevel > state.level) {
        state.level = newLevel;
        badgeAward(`Level ${newLevel} Achieved`);
        showToast(`Congratulations! You reached Level ${newLevel}!`, 'success');
    }
    
    // Update the student's data in the roster if they are a student
    if (state.user.role === 'student') {
        const index = state.roster.findIndex(r => r.id === state.user.id);
        if (index > -1) {
            state.roster[index].points = state.points;
            state.roster[index].level = state.level;
        }
    }
    
    persist(); 
    renderDashboard(); 
    renderProfile(); 
    renderRoster();
}
// ... (rest of gamification functions remain the same)

function renderDashboard(){
    $('#points').textContent = state.points;
    $('#level').textContent = state.level;
    const progressPercent = Math.min(100, (state.points % 100));
    $('#progress-bar').style.width = `${progressPercent}%`;
    $('#progress-bar').closest('.progress').setAttribute('aria-valuenow', progressPercent);
}

// ... (rest of profile and challenge rendering remains the same)

// ---------- ANALYTICS & CSV EXPORT ----------

// ... (existing renderAnalytics function to prepare data)

function drawBarChart(canvas, labels, data) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    // Config
    const maxScore = 100;
    const margin = 30;
    const chartHeight = h - margin * 2;
    const chartWidth = w - margin * 2;
    const barSpacing = 10;
    const barWidth = (chartWidth / Math.max(1, labels.length)) - barSpacing;

    ctx.font = '12px "Inter", sans-serif';
    ctx.fillStyle = '#0f1724';
    
    // Draw Y-Axis (Score guide lines)
    [25, 50, 75, 100].forEach(score => {
        const y = margin + chartHeight * (1 - score / maxScore);
        ctx.strokeStyle = '#eef6fb';
        ctx.beginPath();
        ctx.moveTo(margin, y);
        ctx.lineTo(w - margin, y);
        ctx.stroke();
        
        ctx.fillText(score, 0, y + 4);
    });

    // Draw Bars and Labels
    labels.forEach((lab, i) => {
        const val = data[i] || 0;
        const barHeight = chartHeight * (val / maxScore);
        const x = margin + i * (barWidth + barSpacing) + barSpacing / 2;
        const y = h - margin - barHeight;

        // Bar Color based on score
        if (val >= 85) ctx.fillStyle = 'var(--secondary)';
        else if (val >= 60) ctx.fillStyle = 'orange';
        else ctx.fillStyle = 'var(--danger)';
        
        // Draw Bar
        ctx.fillRect(x, y, barWidth, barHeight);
        
        // Draw X-Axis Label (Species)
        ctx.fillStyle = '#0f1724';
        ctx.fillText(lab, x + barWidth / 2 - ctx.measureText(lab).width / 2, h - 10);
        
        // Draw Value Label (Score)
        ctx.fillText(val, x + barWidth / 2 - ctx.measureText(val).width / 2, y - 5);
    });
}
// ... (rest of analytics functions)

function exportCSV(){
    // Simplified export function to include user and species name
    const headers = ['User', 'Species', 'Score', 'Date'];
    const csvRows = [
        headers.join(','),
        ...state.history.map(h => `${h.user},${h.speciesName},${h.score},${h.date}`)
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AquaEduGame_Progress.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast('Progress exported successfully.', 'success');
}
function resetAllData(){
    if(confirm('WARNING: This will erase ALL local user data (points, history, progress). Continue?')){
        LS.clear();
        window.location.reload();
    }
}

// ---------- LESSONS ----------
function wireLessons(){
    $$('.lesson-btn').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            const lesson = btn.dataset.lesson;
            showLesson(lesson);
        });
    });
}

function showLesson(lessonType){
    let title = '';
    let content = '';

    switch(lessonType){
        case 'intro':
            title = 'Introduction to Aquaculture';
            content = `
                <div class="lesson-content">
                    <h3>What is Aquaculture?</h3>
                    <p>Aquaculture is the farming of aquatic organisms such as fish, crustaceans, mollusks, and aquatic plants. It involves cultivating freshwater and saltwater populations under controlled conditions.</p>

                    <h4>Why Aquaculture Matters</h4>
                    <ul>
                        <li>Provides sustainable food source for growing population</li>
                        <li>Reduces pressure on wild fish stocks</li>
                        <li>Creates economic opportunities in coastal communities</li>
                        <li>Can be more environmentally controlled than traditional fishing</li>
                    </ul>

                    <h4>Types of Aquaculture</h4>
                    <ul>
                        <li><strong>Marine aquaculture:</strong> Farming in seawater</li>
                        <li><strong>Freshwater aquaculture:</strong> Farming in freshwater ponds, tanks, or cages</li>
                        <li><strong>Brackish water aquaculture:</strong> Farming in estuaries or coastal areas</li>
                    </ul>
                </div>

                <div class="lesson-quiz">
                    <h4>Quick Quiz</h4>
                    <p>What is the main purpose of aquaculture?</p>
                    <button class="btn primary" onclick="alert('Correct! Aquaculture provides sustainable food production.')">To provide sustainable food</button>
                    <button class="btn btn-secondary" onclick="alert('Not quite - while it can be profitable, the main purpose is sustainable food production.')">To make money</button>
                </div>
            `;
            break;

        case 'water':
            title = 'Water Quality Management';
            content = `
                <div class="lesson-content">
                    <h3>Critical Water Parameters</h3>
                    <p>Maintaining optimal water quality is essential for successful aquaculture operations.</p>

                    <h4>Key Parameters to Monitor</h4>
                    <ul>
                        <li><strong>pH:</strong> Measures acidity/alkalinity (ideal range: 6.5-8.5)</li>
                        <li><strong>Temperature:</strong> Affects metabolism and oxygen solubility</li>
                        <li><strong>Dissolved Oxygen:</strong> Essential for fish respiration (minimum 5 mg/L)</li>
                        <li><strong>Ammonia:</strong> Toxic waste product (should be <0.1 mg/L)</li>
                        <li><strong>Nitrite:</strong> Intermediate in nitrogen cycle (should be <0.1 mg/L)</li>
                        <li><strong>Nitrate:</strong> Less toxic but can cause stress at high levels</li>
                    </ul>

                    <h4>Water Quality Management Strategies</h4>
                    <ul>
                        <li>Regular monitoring and testing</li>
                        <li>Proper aeration and oxygenation</li>
                        <li>Water exchange and filtration systems</li>
                        <li>Feeding management to reduce waste</li>
                        <li>Biological filtration using beneficial bacteria</li>
                    </ul>
                </div>

                <div class="lesson-interactive">
                    <h4>Interactive Exercise</h4>
                    <p>Try adjusting the simulator controls to maintain optimal water conditions for tilapia!</p>
                    <button class="btn primary" onclick="showSection('sim-section')">Go to Simulator</button>
                </div>
            `;
            break;

        case 'species':
            title = 'Species Selection';
            content = `
                <div class="lesson-content">
                    <h3>Choosing the Right Species</h3>
                    <p>Selecting appropriate aquaculture species depends on climate, market demand, available resources, and farming experience.</p>

                    <h4>Factors to Consider</h4>
                    <ul>
                        <li><strong>Local climate and water conditions</strong></li>
                        <li><strong>Market demand and price</strong></li>
                        <li><strong>Growth rate and feed conversion efficiency</strong></li>
                        <li><strong>Disease resistance</strong></li>
                        <li><strong>Available technology and expertise</strong></li>
                    </ul>

                    <div class="species-highlights">
                        <div class="highlight-card">
                            <h5>Tilapia</h5>
                            <p>Hardy, fast-growing, tolerant of poor water quality. Ideal for beginners.</p>
                        </div>
                        <div class="highlight-card">
                            <h5>Catfish</h5>
                            <p>High market value, good for intensive culture, disease resistant.</p>
                        </div>
                        <div class="highlight-card">
                            <h5>Shrimp</h5>
                            <p>High value but requires strict water quality control and expertise.</p>
                        </div>
                    </div>
                </div>

                <div class="lesson-quiz">
                    <h4>Species Selection Quiz</h4>
                    <p>Which species is generally recommended for aquaculture beginners?</p>
                    <button class="btn primary" onclick="alert('Correct! Tilapia are hardy and forgiving of water quality issues.')">Tilapia</button>
                    <button class="btn btn-secondary" onclick="alert('Shrimp require more expertise and strict conditions.')">Shrimp</button>
                </div>
            `;
            break;

        case 'sustainable':
            title = 'Sustainable Practices';
            content = `
                <div class="lesson-content">
                    <h3>Sustainable Aquaculture</h3>
                    <p>Sustainable aquaculture balances economic viability with environmental responsibility and social equity.</p>

                    <h4>Key Principles</h4>
                    <ul>
                        <li><strong>Environmental sustainability:</strong> Minimize pollution and habitat impact</li>
                        <li><strong>Economic viability:</strong> Profitable operations that support communities</li>
                        <li><strong>Social responsibility:</strong> Fair labor practices and community benefits</li>
                    </ul>

                    <h4>Sustainable Practices</h4>
                    <ul>
                        <li>Use of recirculating aquaculture systems (RAS)</li>
                        <li>Integrated multi-trophic aquaculture (IMTA)</li>
                        <li>Responsible feed sourcing and feeding practices</li>
                        <li>Proper waste management and effluent treatment</li>
                        <li>Stocking density optimization</li>
                        <li>Selective breeding for improved traits</li>
                    </ul>

                    <h4>Certification Programs</h4>
                    <p>Many countries have certification programs like ASC (Aquaculture Stewardship Council) or BAP (Best Aquaculture Practices) to ensure sustainable production.</p>
                </div>

                <div class="lesson-interactive">
                    <h4>Think About It</h4>
                    <p>How can aquaculture practices be made more sustainable in your local area?</p>
                    <button class="btn primary" onclick="alert('Great question! Consider local water resources, waste management, and community needs.')">Reflect</button>
                </div>
            `;
            break;
    }

    const modalHTML = `
        <div class="modal lesson-modal" role="dialog" aria-modal="true" aria-labelledby="lesson-title">
            <div class="modal-card">
                <button class="btn-close" id="close-lesson" aria-label="Close lesson">&times;</button>
                <h2 id="lesson-title">${title}</h2>
                ${content}
                <div class="lesson-actions">
                    <button class="btn btn-secondary" onclick="showSection('lessons-section')">Back to Lessons</button>
                    <button class="btn primary" onclick="$('#close-lesson').click()">Close</button>
                </div>
            </div>
        </div>
    `;

    $('#modal-root').innerHTML = modalHTML;
    $('#close-lesson').addEventListener('click', ()=> $('#modal-root').innerHTML='');
}
