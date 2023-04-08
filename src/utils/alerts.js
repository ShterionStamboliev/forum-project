import Swal from "sweetalert2";

export const runEmptyFieldAlert = () => {
    return Swal.fire({
        icon: 'error',
        title: 'You cannot leave empty fields!',
    });
};

export const onLoginSuccess = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
    });
    return Toast;
};

export const runSaveDeleteDialog = () => {
    Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    });
};

export const runSuccessfulPostCreation = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Post created successfully!',
        showConfirmButton: false,
        timer: 1500
    });
};

export const runEmptyThreadTitleInput = () => {
    Swal.fire({
        icon: 'error',
        title: 'Please enter thread title.',
    });
};

export const runEmptyDescriptionInput = () => {
    Swal.fire({
        icon: 'error',
        title: 'Please enter thread description.',
    });
};

export const runEmptyEmailField = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Please enter your email.',
    });
};

export const runEmptyPasswordField = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Please enter your password.',
    });
};

export const runEmptyConfirmPasswordField = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Please enter confirm password.',
    });
};

export const runPasswordEqualityCheck = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Password\'s don\'t match.',
    });
};

export const runSignOutAlert = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Signed out successfully'
    });
};

export const runSuccessfulRegistration = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
        icon: 'success',
        title: 'Registration successfull!'
    });
}

export const runEmailLengthError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Email address too short /min 10 symbols/.',
    });
}

export const runPasswordLengthError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Password too short /min 6 symbols/.',
    });
}

export const runEmptyNameError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Please enter your name.',
    });
};

export const runEmptyLastNameError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Please enter your last name.',
    });
};

export const runEmptyUsernameError = () => {
    return Swal.fire({
        icon: 'error',
        title: 'Please enter your username.',
    });
};


export const runInvalidSignIn = () => {
    Swal.fire({
        icon: 'error',
        title: 'Invalid e-mail or password',
    });
};