
function deleteHotel(id) {
    
    // delete hotel with the provided ID
    $.ajax({
        url: `http://localhost:3000/hotels/${id}`,
        method: "DELETE",
        success: function() {
            alert("Successfully Deleted");
        }
    })
}

function editHotel(id) {
    // get values from client and retrieve user id from local storage
    const name = $('#editName'+id).val();
    const description = $('#editHotelDescription'+id).val();
    const userId = Number(localStorage.getItem('id'));
    const address = $('#editHotelAddress'+id).val();
    const state = $('#editHotelState'+id).val();
    const phone = $('#editHotelPhone'+id).val();
    const imageUrl = $('#editHotelImage'+id).val();

    // Validate
    if((description.length < 0 || description === '') || (name.length < 0 || name === '') || (imageUrl.length < 0 || imageUrl === '') || (userId.length < 0 || userId === '') || (address.length < 0 || address === '') || (state.length < 0 || state === '') || (phone.length < 0 || phone === '')) {
        alert('Please fill in the fields to edit');
        return;
    }

    // create data object with values from client
    const data = {
        description,
        userId,
        name,
        imageUrl,
        address,
        state,
        phone
    }

    // edit hotel with the provided ID
    $.ajax({
        url: `http://localhost:3000/hotels/${id}`,
        method: 'PUT',
        data: data,
        success: function() {
            window.location.replace('editHotel.html')
        }
    });
}