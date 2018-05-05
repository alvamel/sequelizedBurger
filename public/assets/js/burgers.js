// Wait till the DOM is fully loaded
$(function () {
    $(".devour-burger").on("click", function (event) {
        var id = $(this).data("id");

        var newDevoured = {
            devoured: true
        }

        // Set the PUT request
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevoured
        }).then(
            function () {
                console.log("Burger devoured");
                // Reload page to update list
                location.reload();
            }
          )
        })

        $(".create-form").on("submit", function (event) {
            // Make sure to use preventDefault on a submit event
            event.preventDefault();

            var newBurger = {
                name: $("#ca").val().trim(),
                devoured: false
            };

            // Send POST request
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                function () {
                    console.log("created new burger");
                    // Reload page to update list
                    location.reload();
                }
            );
        });
    });