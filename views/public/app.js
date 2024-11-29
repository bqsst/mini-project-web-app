function confirmDelete(detail_id) {
    if (confirm(`Are you sure you want to delete this customer with ID ${detail_id}?`)) {
        window.location.href = `/detail/delete/${detail_id}`;
    }
}

function toggleShowPassword() {
    const passwordFeild = document.getElementById('password')
    const toggleIcon = document.getElementById('toggleIcon')

    if(passwordFeild.type === 'password'){    
        passwordFeild.type = 'text'
        toggleIcon.src = '/images/show-icon.png'
        toggleIcon.alt = 'Show password icon'
    }else {
        passwordFeild.type = 'password'
        toggleIcon.src = '/images/hide-icon.png'
        toggleIcon.alt = 'Hide password icon'
    }
}