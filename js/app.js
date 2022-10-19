import {bubbleSort, insertionSort, selectionSort, mergeSort, quickSort} from "./algos.js";

const visualizer = document.getElementById('graph');
const new_array = document.getElementById('new_array');
const size_slider = document.getElementById('size_slider');
const speed_slider = document.getElementById('speed_slider');
const bubble_sort_btn = document.getElementById('bubble_sort');
const insertion_sort_btn = document.getElementById('insertion_sort');
const selection_sort_btn = document.getElementById('selection_sort');
const merge_sort_btn = document.getElementById('merge_sort');
const quick_sort_btn = document.getElementById('quick_sort');
const bars = document.getElementsByClassName("bar");

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 10;
}

function deleteGraph()
{
    graph.innerHTML = '';
}

// creates a random array of the size selected by the user using the slider and generates a graph from it.
// Returns the array
function generateGraph()
{
    
    deleteGraph();

    let size = parseInt(size_slider.value);
    let arr = new Array();

    for (let i = 0; i < size; i++)
    {
        arr[i] = getRandomInt(100);
        let bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = arr[i] * 5 + "px";
        bar.style.backgroundColor = "#A288E3";
        bar.style.margin = 3 + "px";
        bar.style.width = 30 + "px";
        visualizer.appendChild(bar);
    }

    return arr;
}

function disableButtons()
{
    new_array.disabled = true;
    speed_slider.disabled = true;
    size_slider.disabled = true;
    bubble_sort_btn.disabled = true;
    insertion_sort_btn.disabled = true;
    selection_sort_btn.disabled = true;
    merge_sort_btn.disabled = true;
    quick_sort_btn.disabled = true;
}

function enableButtons()
{
    new_array.disabled = false;
    speed_slider.disabled = false;
    size_slider.disabled = false;
    bubble_sort_btn.disabled = false;
    insertion_sort_btn.disabled = false;
    selection_sort_btn.disabled = false;
    merge_sort_btn.disabled = false;
    quick_sort_btn.disabled = false;
}

let array = generateGraph();

size_slider.addEventListener("input", function() {
    array = generateGraph();
});

new_array.addEventListener("click", function() {
    array = generateGraph();
})

insertion_sort_btn.addEventListener("click", async () =>
{
    disableButtons();
    await insertionSort(bars);
    enableButtons();
});

bubble_sort_btn.addEventListener("click", async () =>
{
    disableButtons();
    await bubbleSort(bars);
    enableButtons();
})

selection_sort_btn.addEventListener("click", async () =>
{
    disableButtons();
    await selectionSort(bars);
    enableButtons();
})

merge_sort_btn.addEventListener("click", async () =>
{
    disableButtons();
    await mergeSort(bars, 0, bars.length-1);
    enableButtons();
});

quick_sort_btn.addEventListener("click", async () => 
{
    disableButtons();
    await quickSort(bars, 0, bars.length-1);
    enableButtons();
});