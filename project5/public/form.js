window.onload = () =>{
    document.getElementById('form').addEventListener('submit', function(event) {
        // Check if at least one checkbox in the restaurant/recipe section is selected 
        var R = document.getElementsByName('category');
        var RSelected = false;
        for (var i = 0; i < R.length; i++) {
            if (R[i].checked) {
                RSelected = true;
                break;
            }
        }
        // Check if at least one checkbox in the flavors section is selected
        var flavors = document.getElementsByName('flavor');
        var flavorSelected = false;
        for (var i = 0; i < flavors.length; i++) {
            if (flavors[i].checked) {
                flavorSelected = true;
                break;
            }
        }
        // Check if at least one radio button in the rating section is selected
        var rating = document.getElementsByName('rating');
        var ratingSelected = false;
        for (var i = 0; i < rating.length; i++) {
            if (rating[i].checked) {
                ratingSelected = true;
                break;
            }
        }
        // Prevent form submission if any of the selections are left empty
        if (!flavorSelected) {
            alert('Please select at least one flavor.');
            event.preventDefault();  
        } else if (!ratingSelected) {
            alert('Please select a rating.');
            event.preventDefault();  
        } else if (!RSelected){
            alert('Please select resturant or recipe.');
            event.preventDefault();  
        }
    });
        // make clear to user that they can add input if they selected 'other' in the flavors & diet section
        var otherCheckbox = document.querySelector("input[name='isOtherChecked']");
        var otherInput = document.getElementById("other");

        otherCheckbox.addEventListener("change", function () {
            if (this.checked) {
                otherInput.style.outline = "2px solid blue"; 
            } else {
                otherInput.style.outline = "none"; 
            }
        })
        const ratingCells = document.querySelectorAll(".rating-row td"); 
        const ratingInputs = document.querySelectorAll(".rating-row input[type='radio']"); 
    
        ratingInputs.forEach((input, index) => {
            input.addEventListener("change", function () {
                updateRatingColors(index);
            });
        });
        // Ensure only one checkbox can be selected in the "Restaurant or Recipe" section
        const RCheckboxes = document.getElementsByName('category');
        
        RCheckboxes.forEach((checkbox) => {
            checkbox.addEventListener("change", function () {
                RCheckboxes.forEach((otherCheckbox) => {
                    if (otherCheckbox !== this) {
                        otherCheckbox.checked = false; // Uncheck the other checkbox
                    }
                });
            });
        });

        function updateRatingColors(selectedIndex) {
            ratingCells.forEach((cell, index) => {
                if (index <= selectedIndex) {
                    cell.style.backgroundColor = "#FDD131"; 
                } else {
                    cell.style.backgroundColor = "transparent"; 
                }
            });
        }
    
    }