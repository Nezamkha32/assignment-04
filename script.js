let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');


function calculateCount() {
  let totalJobs = allCardSection.children.length;
  total.innerText = totalJobs;          // Dashboard Total
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  // Available Jobs Section count
  document.getElementById('jobCount').innerText = totalJobs;
}
calculateCount();


function toggleStyle(id) {
  [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
    btn.classList.add('bg-gray-300', 'text-black');
    btn.classList.remove('bg-black', 'text-white');
  });

  const selected = document.getElementById(id);
  currentStatus = id;
  selected.classList.remove('bg-gray-300', 'text-black');
  selected.classList.add('bg-black', 'text-white');

  if (id === 'interview-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderInterview();
  } else if (id === 'all-filter-btn') {
    allCardSection.classList.remove('hidden');
    filterSection.classList.add('hidden');
  } else if (id === 'rejected-filter-btn') {
    allCardSection.classList.add('hidden');
    filterSection.classList.remove('hidden');
    renderRejected();
  }
}

mainContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('interview-btn')) {



    handleStatusChange(event, 'Interview');
  } else if (event.target.classList.contains('rejected-btn')) {
    handleStatusChange(event, 'Rejected');
  } else if (event.target.classList.contains('btn-delete')) {
    handleDelete(event);
  }
});

function handleStatusChange(event, newStatus) {
  const parentNode = event.target.closest('.card');
  const cardId = parentNode.getAttribute('data-id'); // DOM থেকে id নাও


  const companyName = parentNode.querySelector('.companyName').innerText;
  const position = parentNode.querySelector('.position').innerText;
  const location = parentNode.querySelector('.location').innerText;
  const salary = parentNode.querySelector('.salary').innerText;
  const description = parentNode.querySelector('.description').innerText;

  parentNode.querySelector('.status').innerText = newStatus;

  const cardInfo = { 
    id: cardId,   // এখানে cardId ব্যবহার করো
    companyName, 
    position, 
    location, 
    salary, 
    description, 
    status: newStatus 
  };

  if (newStatus === 'Interview') {
    if (!interviewList.find(item => item.id === cardId)) {
      interviewList.push(cardInfo);
    }
    rejectedList = rejectedList.filter(item => item.id !== cardId);
    if (currentStatus === 'rejected-filter-btn') 
    renderRejected();
  } else {
    if (!rejectedList.find(item => item.id === cardId)) {
      rejectedList.push(cardInfo);
    }
    interviewList = interviewList.filter(item => item.id !== cardId);
    if (currentStatus === 'interview-filter-btn') 
    renderInterview();
  }

  calculateCount();
}


function handleDelete(event) {
  const card = event.target.closest('.card');
  const cardId = card.getAttribute('data-id');

  // All tab এর আসল কার্ড খুঁজে বের করো
  const originalCard = allCardSection.querySelector(`[data-id="${cardId}"]`);
  if (originalCard) {
    originalCard.remove();
  }

  // Filtered tab এর কার্ডও মুছে দাও
  if (!allCardSection.contains(card)) {
    card.remove();
  }

  // Interview/Rejected লিস্ট থেকেও রিমুভ করো
  interviewList = interviewList.filter(item => item.id !== cardId);
  rejectedList = rejectedList.filter(item => item.id !== cardId);

  if (currentStatus === 'interview-filter-btn') 
  renderInterview();
  else if (currentStatus === 'rejected-filter-btn') 
  renderRejected();

  calculateCount();
}

function renderInterview() {
  filterSection.innerHTML = '';
if (interviewList.length === 0) {
  filterSection.innerHTML = `
    <div class="flex flex-col items-center justify-center space-y-3">
      <img src="./img/jobs.png" class="w-24" alt="">
      <p class="text-xl font-semibold text-gray-600">No jobs Available</p>
      <p class="text-gray-500">Check back soon for new job opportunities.</p>
    </div>
  `;
  return;
}
  interviewList.forEach(job => filterSection.appendChild(createCard(job)));
}

function renderRejected() {
  filterSection.innerHTML = '';
  if (rejectedList.length === 0) {
    filterSection.innerHTML = `
    <div class="flex flex-col items-center justify-center space-y-3">
      <img src="./img/jobs.png" class="w-24" alt="">
      <p class="text-xl font-semibold text-gray-600">No jobs Available</p>
      <p class="text-gray-500">Check back soon for new job opportunities.</p>
    </div>
  `;
    return;
  }
  rejectedList.forEach(job => filterSection.appendChild(createCard(job)));
}
let jobCounter = 0;

function createCard(data) {
  let div = document.createElement('div');
  div.className = 'card flex justify-between border p-8';
  div.setAttribute('data-id', data.id); // সবসময় data.id ব্যবহার করো

  div.innerHTML = `
    <div class="space-y-6">
      <div>
        <p class="companyName text-2xl font-bold">${data.companyName}</p>
        <p class="position">${data.position}</p>
        <p class="location">${data.location}</p>
        <p class="salary">${data.salary}</p>
      </div>
      <p class="description">${data.description}</p>
      <p class="status">${data.status}</p>
      <div class="flex gap-5">
        <button class="interview-btn bg-green-200 px-4 py-2">Interview</button>
        <button class="rejected-btn bg-red-200 px-4 py-2">Rejected</button>
      </div>
    </div>
    <div>
      <button class="btn-delete bg-red-200 text-red-600 px-4 py-2 rounded-4xl"><i class="fa-solid fa-trash-can "></i></button>
    </div>
  `;
  return div;
}

// jobCounter++;
// const cardInfo = {
//   id: jobCounter, // unique id
//   companyName,
//   position,
//   location,
//   salary,
//   description,
//   status: 'Not Applied'
// };
// allCardSection.appendChild(createCard(cardInfo));



