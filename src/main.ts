document.addEventListener('DOMContentLoaded', () => {
    const hello = document.createElement('p');
    hello.textContent = 'Script loaded!';
    document.getElementById('app')!.appendChild(hello);
});
