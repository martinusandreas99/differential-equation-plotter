document.querySelectorAll('input[type="color"]').forEach(elm=>elm.addEventListener('input', e => {
    e.target.setAttribute('value', e.target.value);
    e.target.style.color = e.target.value;
}));

document.querySelector('#canvas canvas').addEventListener('click',
    e => {
        const rect = e.target.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        x = DiffGrid.rescale(x, 0, e.target.clientWidth, scene.options.screen.minX, scene.options.screen.maxX);
        y = DiffGrid.rescale(y, 0, e.target.clientHeight, scene.options.screen.maxY, scene.options.screen.minY);
        scene.addSolution(x,y);
    }
);

document.querySelectorAll('input[data-option]').forEach(elm=>
    elm.addEventListener('change', e =>
        scene.updateOption(e.target)));

document.querySelectorAll('input').forEach(elm=> {
    elm.addEventListener('change', e => {
        if (e.target.type === 'checkbox') {
            localStorage.setItem(e.target.id, e.target.checked.toString())
        } else {
            localStorage.setItem(e.target.id, e.target.value)
        }
    });

    const val = localStorage.getItem(elm.id);
    const event = new Event('change');
    if (val !== null) {
        if (elm.type === 'checkbox') {
            elm.checked = val === 'true'
        } else {
            elm.value = val;
        }
        elm.dispatchEvent(event);
    }
});
