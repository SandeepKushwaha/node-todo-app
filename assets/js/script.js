window.onload = (event) => {
    console.log("page is fully loaded");
};

function checkedOrNot() {
    let checkboxes = document.querySelectorAll('.deletecheck');
    let desc = document.querySelectorAll('.display-text');
    let date = document.querySelectorAll('.due-date');

    for (let i = 0; i < checkboxes.length; i++) {
        let dueDate = date[i].innerHTML;

        if (checkboxes[i].checked == true) {
            console.log(checkboxes[i].getAttribute('itemid'));
            document.getElementById(checkboxes[i].getAttribute('itemid')).style.textDecoration = 'line-through';
            document.getElementById(checkboxes[i].getAttribute('itemid') + dueDate).style.textDecoration = 'line-through';
        } else if (checkboxes[i].checked == false) {
            document.getElementById(checkboxes[i].getAttribute('itemid')).style.textDecoration = 'none';
            document.getElementById(checkboxes[i].getAttribute('itemid') + dueDate).style.textDecoration = 'none';
        }
    }
}

document.getElementById('delete-btn').addEventListener('click', function () {
    let checkedValues = document.querySelectorAll('.deletecheck:checked');
    let checkArr = [];

    for (let i of checkedValues) {
        let x = '';
        x = i.getAttribute('itemid');
        console.log("item=", x);
        checkArr.push(x);
    }

    if (checkArr === 0) {
        alert('No Item selected.');
        return;
    }

    $.ajax({ 
        type: 'post',
        url: '/delete-todo/?id=' + checkArr,
        success: function () { 
            alert('Item deleted');
            location.reload(); // Refresh the page
        },
        error: function (error) { 
            console.log(error);
        }
    });
});



