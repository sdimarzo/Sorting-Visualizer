/*
    COLORS:
    #a288e3 -> purple (default graph color)
    #f6efa6 -> yellow (used to highlight the selected elemets)
    #ff7477 -> red (used to highlight the elemets that need to swapped)
    #2d936c -> green (1. used if the elements selected don't need to be swapped; 2. used when the graph is completely sorted)
    #92DDC0 -> light green (used for elements that have been already sorted and are in the correct position)
    #7149d4 -> dark purple (used to highlight the pivot in the quicksort algorithm)
*/

const RESET_TIME = 1000;

function waitforme(milisec) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, milisec); 
    }) 
}

export async function insertionSort(_graph)
{
    for (let i = 1; i < _graph.length; i++)
    {
        let j = i - 1;
        let target = _graph[i].style.height;

        _graph[i].style.backgroundColor = "#f6efa6";
        _graph[j].style.backgroundColor = "#f6efa6";

        await waitforme(speed_slider.value);

        while (j>=0 && parseInt(_graph[j].style.height) > parseInt(target))
        {
            _graph[j].style.backgroundColor = "#f6efa6";
            let tmp = _graph[j].style.height;

            await waitforme(speed_slider.value);

            _graph[j].style.backgroundColor = "#ff7477";
            _graph[j+1].style.backgroundColor = "#ff7477";
            await waitforme(speed_slider.value);
            _graph[j].style.height = _graph[j+1].style.height;
            _graph[j+1].style.height = tmp;
            await waitforme(speed_slider.value);
            _graph[j].style.backgroundColor = "#f6efa6";
            _graph[j+1].style.backgroundColor = "#a288e3";
            j--;
        }
        if (j >= 0)
        {
            _graph[j].style.backgroundColor = "#f6efa6";
            _graph[j+1].style.backgroundColor = "#f6efa6";
            await waitforme(speed_slider.value);
            _graph[j].style.backgroundColor = "#2d936c";
            _graph[j+1].style.backgroundColor = "#2d936c";
            await waitforme(speed_slider.value);
            _graph[j].style.backgroundColor = "#a288e3";
        }
        _graph[i-1].style.backgroundColor = "#a288e3";
        _graph[j+1].style.backgroundColor = "#a288e3";
    }

    for (let i = 0; i < _graph.length; i++)
    {
        _graph[i].style.backgroundColor = "#2d936c";
    }   

    await waitforme(RESET_TIME);

    for (let i = 0; i < _graph.length; i++)
    {
        _graph[i].style.backgroundColor = "#a288e3";
    }   
}


export async function bubbleSort(_graph)
{
    for (let i = 0; i < _graph.length - 1; i++)
    {
        for (let j = 0; j < _graph.length - i - 1; j++)
        {
            _graph[j].style.backgroundColor = "#f6efa6";
            _graph[j+1].style.backgroundColor = "#f6efa6";
            await waitforme(speed_slider.value);
            if (parseInt(_graph[j+1].style.height) < parseInt(_graph[j].style.height))
            {
                _graph[j].style.backgroundColor = "#ff7477";
                _graph[j+1].style.backgroundColor = "#ff7477";
                await waitforme(speed_slider.value);
                let tmp = _graph[j].style.height;
                _graph[j].style.height = _graph[j+1].style.height;
                _graph[j+1].style.height = tmp;
            }
            else
            {
                _graph[j].style.backgroundColor = "#2d936c";
                _graph[j+1].style.backgroundColor = "#2d936c";
            }
            await waitforme(speed_slider.value);
            _graph[j].style.backgroundColor = "#a288e3";
            _graph[j+1].style.backgroundColor = "#a288e3";
        }
        _graph[_graph.length-i-1].style.backgroundColor = "#92DDC0";
    }

    for (let i = 0; i < _graph.length; i++)
    {
        _graph[i].style.backgroundColor = "#2d936c";
    }   

    await waitforme(RESET_TIME);

    for (let i = 0; i < _graph.length; i++)
    {
        _graph[i].style.backgroundColor = "#a288e3";
    }  
}


export async function selectionSort(_graph)
{
    for (let i = 0; i < _graph.length-1; i++)
    {
        let k=i;

        _graph[i].style.backgroundColor = "#f6efa6";
        for (let j = i + 1; j < _graph.length; j++)
        {
            _graph[j].style.backgroundColor = "#f6efa6";
            await waitforme(speed_slider.value);
            if (parseInt(_graph[j].style.height) < parseInt(_graph[k].style.height))
            {
                k = j;
            }
            _graph[j].style.backgroundColor = "#a288e3";
        }
        
        if (k != i)
        {
            _graph[k].style.backgroundColor = "#ff7477";
            _graph[i].style.backgroundColor = "#ff7477";
            await waitforme(speed_slider.value);
            let tmp = _graph[i].style.height;
            _graph[i].style.height = _graph[k].style.height;
            _graph[k].style.height = tmp;
            await waitforme(speed_slider.value);
            _graph[k].style.backgroundColor = "#a288e3";
        }
        _graph[i].style.backgroundColor = "#92DDC0";
    }

    for (let i = 0; i < _graph.length; i++)
    {
        _graph[i].style.backgroundColor = "#2d936c";
    }   

    await waitforme(RESET_TIME);

    for (let i = 0; i < _graph.length; i++)
    {
        _graph[i].style.backgroundColor = "#a288e3";
    }
}


export async function mergeSort(_graph, _start, _end)
{
    if (_start < _end)
    {
        let k = Math.floor((_start+_end)/2);
        await mergeSort(_graph, _start, k);
        await mergeSort(_graph, k+1, _end);
        await merge(_graph, _start, k, _end);
    }
 
    if (_start == 0 && _end == _graph.length-1)
    {
        for (let i=_start; i<=_end; i++)
        {
            _graph[i].style.backgroundColor = "#2d936c";
        }
        await waitforme(RESET_TIME);
        for (let i=_start; i<=_end; i++)
        {
            _graph[i].style.backgroundColor = "#a288e3";
        }
    }
}


async function merge(_graph, _start, _mid, _end)
{
    let l = _start;
    let r = _mid+1;
    let t = 0;
    let tmp = new Array();

    for (let i = _start; i <= _end; i++)
    {
        _graph[i].style.backgroundColor = "#f6efa6";
    }

    await waitforme(speed_slider.value);
    let inOrder = true;

    while (l <= _mid && r <= _end)
    {
        if (parseInt(_graph[l].style.height) <= parseInt(_graph[r].style.height))
        {
            tmp[t] = _graph[l].style.height;
            l++;
        }
        else
        {
            tmp[t] = _graph[r].style.height;
            r++;
            inOrder = false;
        }
        t++;
    }
    r = _end;

    if (!inOrder)
    {
        for (let i = _start; i <= _end; i++)
        {
            _graph[i].style.backgroundColor = "#ff7477";
        }
        await waitforme(speed_slider.value);
    }
    else
    {
        for (let i = _start; i <= _end; i++)
        {
            _graph[i].style.backgroundColor = "#2d936c";
        }
    }
    for (let h = _mid; h >= l; h--)
    {
        _graph[r].style.height = _graph[h].style.height;
        r--;
    }

    for ( let h = _start; h <_start + t; h++)
    {
        _graph[h].style.height = tmp[h-_start];
    }

    await waitforme(speed_slider.value);
    for (let i=_start; i<=_end; i++)
    {
        _graph[i].style.backgroundColor = "#a288e3";
    }

    await waitforme(speed_slider.value);
}


async function partition(_graph, _start, _end)
{
    let x = _graph[_end].style.height;
    let i = _start-1;

    _graph[_end].style.backgroundColor = "#7149d4";

    for (let j = _start; j < _end; j++)
    {
        _graph[j].style.backgroundColor = "#f6efa6";
        await waitforme(speed_slider.value);
        if (parseInt(_graph[j].style.height) <= parseInt(x))
        {
            i++;
            if (i != j)
            {
                _graph[i].style.backgroundColor = "#ff7477";
                _graph[j].style.backgroundColor = "#ff7477";
                await waitforme(speed_slider.value);
                let tmp = _graph[i].style.height;
                _graph[i].style.height = _graph[j].style.height;
                _graph[j].style.height = tmp;
                
            }
            else
            {
                _graph[j].style.backgroundColor = "#2d936c";
            }
            await waitforme(speed_slider.value);
            _graph[i].style.backgroundColor = "#a288e3";
            _graph[j].style.backgroundColor = "#a288e3";
        }
        else
        {
            _graph[j].style.backgroundColor = "#2d936c";
            await waitforme(speed_slider.value);
            _graph[j].style.backgroundColor = "#a288e3";
            
        }
    }
    
    i++;

    if (i != _end)
    {
        _graph[i].style.backgroundColor = "#ff7477";
        _graph[_end].style.backgroundColor = "#ff7477";
        await waitforme(speed_slider.value);
        let tmp = _graph[_end].style.height;
        _graph[_end].style.height = _graph[i].style.height;
        _graph[i].style.height = tmp;
        await waitforme(speed_slider.value);
        _graph[i].style.backgroundColor = "#a288e3";
    }
    _graph[_end].style.backgroundColor = "#a288e3";
    return i;
}


export async function quickSort(_graph, _start, _end)
{
    if (_start < _end)
    {
        let q =  await partition(_graph, _start, _end);
        await quickSort(_graph, _start, q-1);
        await quickSort(_graph, q+1, _end);
    }

    if (_start == 0 && _end == _graph.length-1)
    {
        for (let i = _start; i <= _end; i++)
        {
            _graph[i].style.backgroundColor = "#2d936c";
        }
        await waitforme(RESET_TIME);
        for (let i=_start; i<=_end; i++)
        {
            _graph[i].style.backgroundColor = "#a288e3";
        }
    }
}