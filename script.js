let state = {
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [],
    selectedType: 'income'
};

// 1. Navigation Logic
function navigate(viewName, element) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.view').forEach(view => view.classList.add('hidden'));
    document.getElementById(`${viewName}-view`).classList.remove('hidden');
    
    showToast(`Switched to ${viewName.toUpperCase()}`);
}

// 2. Transaction Type logic
function setType(type, btn) {
    state.selectedType = type;
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// 3. Add Transaction
function addTransaction() {
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!desc || isNaN(amount)) {
        showToast("Please enter valid details!", true);
        return;
    }

    const transaction = { id: Date.now(), description: desc, amount: amount, type: state.selectedType };

    if (state.selectedType === 'income') {
        state.balance += amount;
        state.income += amount;
    } else {
        state.balance -= amount;
        state.expense += amount;
    }

    state.transactions.unshift(transaction);
    updateUI();
    document.getElementById('desc').value = '';
    document.getElementById('amount').value = '';
    showToast("Transaction Added!");
}

// 4. Update UI
function updateUI() {
    document.getElementById('totalBalance').innerText = `Rs. ${state.balance.toFixed(2)}`;
    document.getElementById('incVal').innerText = state.income.toFixed(0);
    document.getElementById('expVal').innerText = state.expense.toFixed(0);

    const list = document.getElementById('transactionList');
    list.innerHTML = state.transactions.map(t => `
        <div class="transaction-item" style="border-color: ${t.type === 'income' ? '#10b981' : '#ef4444'}">
            <div><strong>${t.description}</strong><br><small>${new Date().toLocaleDateString()}</small></div>
            <span style="color: ${t.type === 'income' ? '#10b981' : '#ef4444'}">
                ${t.type === 'income' ? '+' : '-'} Rs. ${t.amount}
            </span>
        </div>
    `).join('');
}

// 5. Utilities
function showToast(msg, isError = false) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.background = isError ? "#ef4444" : "#1e293b";
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 2500);
}

function clearAll() {
    if(confirm("Clear all data?")) {
        state = { balance: 0, income: 0, expense: 0, transactions: [], selectedType: 'income' };
        updateUI();
        showToast("Data Reset Successful");
    }
}