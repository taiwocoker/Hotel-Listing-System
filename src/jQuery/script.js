$(document).ready(function () {
    // to get the value of the logged in user id from the local storage
    let id = Number(localStorage.getItem('id'));

    // query to the jsonServer to get the stored hotels (read all hotels from the database)
    jQuery.get('http://localhost:3000/hotels', function(data) {
    
        if(data.length >= 6) {
            // Looping over the first six hotels to be displayed on the landing page..
            for (let i = 0; i < 6; i++) {            
                // if(i >= 6) break;
                

                // To get the description and src properties from the gotten data
                let src = data[i].imageUrl,
                description = data[i].description;

                // Appends the html elements to the element with class 'featured' on the landing page
                $('.featured').append(`<div class="col-md-4 gEle" id="${data[i].id}">
                    <div class="thumbnail">
                        <img data-toggle="modal" data-target="#featured${data[i].id}"  src="./src/images/gallery/${src}" alt="hotelRoom" style="width:100%">
                        <div class="caption">
                        <p>${description}</p>
                        </div>
                    </div>

                    <!-- Modal to display singleImage-->
                    <div id="featured${data[i].id}" class="modal fade" role="dialog">
                        <div class="modal-dialog"><div class="thumbnail">
                                <img src="./src/images/gallery/${src}" alt="hotelRoom" style="width:100%">
                                <div class="caption">
                                    <p>${data[i].name}</p>
                                    <p>${description}</p>
                                    <p>${data[i].address}</p>
                                    <p>${data[i].state}</p>
                                    <p>${data[i].phone}</p>
                                </div>
                            </div>           
                        </div>
                    </div>
                </div>`);
            }
        }



         // Looping over all hotels from database..
        for(let i = 0; i < data.length; i++) {
            let src = data[i].imageUrl,
            description = data[i].description;
            
            // compare userId value with the id of the logged in user (read and display all hotels created by the logged in user)
            if(Number(data[i].userId) === id) {
                // if same, append the html elements to the element with class 'editFeatures' on the profile page
                $('.editFeatures').append(`<div class="col-md-4" id="${data[i].id}">
                    <div class="thumbnail">
                        <img data-toggle="modal" data-target="#viewList${data[i].id}" src="./src/images/gallery/${src}" alt="Lights" style="width:100%">
                        <div class="caption">
                            <button data-toggle="modal" data-target="#editModal${data[i].id}" type="button" class="btn btn-primary colEdit">EDIT</button>
                            <button data-toggle="modal" data-target="#deleteModal${data[i].id}"  type="button" class="btn btn-danger colDelete">DELETE</button>
                        </div>
                    </div>

                    <!-- Modal for singleImage-->
                    <div id="viewList${data[i].id}" class="modal fade" role="dialog">
                        <div class="modal-dialog">                            
                            <div class="thumbnail">
                                <img src="./src/images/gallery/${src}" alt="hotelRoom" style="width:100%">
                                <div class="caption">
                                    <p>${data[i].name}</p>
                                    <p>${description}</p>
                                    <p>${data[i].address}</p>
                                    <p>${data[i].state}</p>
                                    <p>${data[i].phone}</p>
                                </div>
                            </div>                            
                        </div>
                    </div>

                    <!-- Modal for Delete-->
                    <div id="deleteModal${data[i].id}" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="text-center">Delete Hotel</h4>
                                </div>
                                <div class="modal-body green">
                                    <p class="text-center"> Do you really want to delete? </p>                                        
                                </div>    
                    
                                <div class="modal-footer">
                                    <button type="button" onClick="deleteHotel(${data[i].id})" class="btn colMDelete btn-danger">DELETE</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <!-- Modal for Edit-->
                    <div id="editModal${data[i].id}" class="modal fade" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h3>Edit Hotel</h3>
                                </div>
                                <div class="modal-body">
                                    <form action="javascript:void(0);" method="PUT"> 
                                        <div class="form-group">
                                            <label for="hotelName">Name:</label>
                                            <input type="text" class="form-control" id="editName${data[i].id}" placeholder="edit name" name="hotel">
                                        </div>
                                        
                                        <div class="form-group">
                                            <label for="description">Description:</label>
                                            <input type="text" class="form-control" id="editHotelDescription${data[i].id}" placeholder="describe your hotel" name="description">
                                        </div>

                                        <div class="form-group">
                                            <label for="editAddress">Address:</label>
                                            <input type="text" class="form-control" id="editHotelAddress${data[i].id}" placeholder="hotel address" name="address">
                                        </div>

                                        <div class="form-group">
                                            <label for="editState">State:</label>
                                            <input type="text" class="form-control" id="editHotelState${data[i].id}" placeholder="State" name="state">
                                        </div>

                                        <div class="form-group">
                                            <label for="editPhone">Phone:</label>
                                            <input type="text" class="form-control" id="editHotelPhone${data[i].id}" placeholder="Phone" name="phone">
                                        </div>
                    
                                        <div class="form-group">
                                            <label for="editImage">Image:</label>
                                            <input type="text" class="form-control" id="editHotelImage${data[i].id}" placeholder="image name" name="image">
                                        </div>
                                        
                                        <button type="submit" id="editDesigner" onClick="editHotel(${data[i].id})" class="btn btn-success">Edit Hotel</button>
                                    </form>
                                </div>
                            </div>
                
                        </div>
                    </div>
                </div>`);

            }

            // Appends the html elements to the element with class 'allFeatured' on the listall page (read and display all hotels)
            $('.allFeatured').append(`<div class="col-md-4" id="${data[i].id}">
                <div class="thumbnail">
                    <img data-toggle="modal" data-target="#allFeatured${data[i].id}" src="./src/images/gallery/${src}" alt="hotelRoom" style="width:100%">
                    <div class="caption">
                    <p>${description}</p>
                    </div>
                </div>

                <!-- Modal for singleImage-->
                <div id="allFeatured${data[i].id}" class="modal fade" role="dialog">
                    <div class="modal-dialog">
                        <div class="thumbnail">
                            <img src="./src/images/gallery/${src}" alt="hotelRoom" style="width:100%">
                            <div class="caption">
                                <p>${data[i].name}</p>
                                <p>${description}</p>
                                <p>${data[i].address}</p>
                                <p>${data[i].state}</p>
                                <p>${data[i].phone}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
        }
    });

    // hiding and displaying certain html elements depending on if a user is logged in or not
    if (!id) {
        $('#glyphicon-log-out').hide();
        $('#viewProfile').hide();
    } else {
        $('#glyphicon-log-in').hide();
        $('#glyphicon-user').hide();
    }

    // logic to manage Login
    $('#loginSubmit').click(function(e) {
        e.preventDefault();
        
        // get your email and password values
        const email = $('#loginEmail').val();
        const password = $('#loginPwd').val();

        // validate
        if((email.length < 0 || email === '') || (password.length < 0 || password === '')) {
            alert('Please fill in the fields to login');
        } else {
            
            // get all users on successful validation
            $.get('http://localhost:3000/users', function(data) {

                // loop through and compares the values from the client with the gotten values from the database
                for (let i = 0; i < data.length; i++) {
                    if (data[i].email === email && data[i].password === password) {

                        // on successful, save the user id to the local storage
                        localStorage.setItem('id', JSON.stringify(data[i].id) );
                        return window.location.replace('../../listhotel.html');
                    }
                }
                alert('Invalid Credentials');
            });
        }
    })

    //logout
    $('#glyphicon-log-out').click(function(e) {
        localStorage.clear();
        window.location.replace('../../index.html');
    })

    // To sign up
    $('#createHotelList').click(function(e) {
        e.preventDefault();

        // get values from client
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();
        const email = $('#email').val();
        const password = $('#signupPwd').val();

        // validate
        if((firstName.length < 0 || firstName === '') || (lastName.length < 0 || lastName === '') || (email.length < 0 || email === '') || (password.length < 0 || password === '')) {
            alert('Please fill in the fields to create user');
            return;
        }

        // create data object with values from client
        const data = {
            firstName,
            lastName,
            email,
            password
        }

        // to check if email exists already;
        let emailExist = false;
        // get all users from database
        $.get('http://localhost:3000/users', function(db) {
            
            // loop through all users and confirm if email already exist
            for (let i = 0; i < db.length; i++) {
                if (db[i].email === data.email) {
                    emailExist = true;
                }

                // if email exist, alert and return
                if(emailExist) {
                    alert('User already exist');
                    return;
                } 
            }
            
            // if email does not exist, create user
            $.post("http://localhost:3000/users", data, function(newUser) {

                // save the user id to the local storage
                localStorage.setItem('id', JSON.stringify(newUser.id));
                window.location.replace('../../listhotel.html');
                alert('User Created Successfully');
            });
            
        });    
    })

    // To create a new hotel
    $('#createHotel').click(function(e) {
        e.preventDefault();

        // get values from client and retrieve user id from local storage
        const name = $('#hotelName').val();
        const description = $('#hotelDescription').val();
        const userId = Number(localStorage.getItem('id'));
        const address = $('#hotelAddress').val();
        const state = $('#hotelState').val();
        const phone = $('#hotelPhone').val();
        const imageUrl = $('#hotelImage').val();

        // Validate
        if((description.length < 0 || description === '') || (name.length < 0 || name === '') || (imageUrl.length < 0 || imageUrl === '') || (userId.length < 0 || userId === '') || (address.length < 0 || address === '') || (state.length < 0 || state === '') || (phone.length < 0 || phone === '')) {
            alert('Please fill in the fields to list hotel');
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

        // create hotel
        $.post("http://localhost:3000/hotels", data, function(newUser) {
            alert('Hotel list Created Successfully');
        });
    })


    // To navigate to home page
    $('.nav-home').click(function(e) {
        e.preventDefault();
        window.location.replace('../../index.html');
    })

    // To navigate to profile page
    $('#viewProfile').click(function(e) {
        e.preventDefault();
        window.location.replace('../../edithotel.html');
    })


})