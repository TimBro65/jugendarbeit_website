```javascript
// ==========================================
// DATEN LADEN
// ==========================================

fetch("data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {

        // NEWS
        showNews(data);

        // PROGRAMME
        showProgrammes(data);

        // KALENDER
        showCalendar(data);

        // KONTAKT
        showContact(data);

    })
    .catch(function(error) {

        console.log("Fehler beim Laden:", error);

    });


// ==========================================
// NEWS
// ==========================================

function showNews(data) {

    var container = document.getElementById("news-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (var i = 0; i < data.news.length; i++) {

        var news = data.news[i];

        var card = document.createElement("div");

        card.className = "glass-card news-card";

        var date = document.createElement("div");
        date.className = "news-date";
        date.textContent = news.datum;

        var title = document.createElement("h2");
        title.textContent = news.titel;

        var text = document.createElement("p");
        text.textContent = news.text;

        card.appendChild(date);
        card.appendChild(title);
        card.appendChild(text);

        container.appendChild(card);
    }
}


// ==========================================
// PROGRAMME
// ==========================================

function showProgrammes(data) {

    var container =
        document.getElementById("programmes-container");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    for (var i = 0; i < data.programme.length; i++) {

        var programme = data.programme[i];

        var card = document.createElement("div");

        card.className =
            "glass-card programme-card";


        var icon = document.createElement("div");

        icon.className =
            "programme-icon";

        icon.textContent = "◆";


        var title =
            document.createElement("h2");

        title.textContent =
            programme.titel;


        var text =
            document.createElement("p");

        text.textContent =
            programme.beschreibung;


        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(text);

        container.appendChild(card);
    }
}


// ==========================================
// KALENDER
// ==========================================

function showCalendar(data) {

    var container =
        document.getElementById("calendar-container");

    var eventsContainer =
        document.getElementById("events-container");


    if (!container) {
        return;
    }


    var now = new Date();

    var year =
        now.getFullYear();

    var month =
        now.getMonth();


    drawCalendar(
        data,
        container,
        eventsContainer,
        year,
        month
    );


    var previous =
        document.getElementById("previous-month");


    var next =
        document.getElementById("next-month");


    if (previous) {

        previous.onclick = function() {

            month--;

            if (month < 0) {

                month = 11;
                year--;

            }

            drawCalendar(
                data,
                container,
                eventsContainer,
                year,
                month
            );
        };
    }


    if (next) {

        next.onclick = function() {

            month++;

            if (month > 11) {

                month = 0;
                year++;

            }

            drawCalendar(
                data,
                container,
                eventsContainer,
                year,
                month
            );
        };
    }
}


// ==========================================
// KALENDER ZEICHNEN
// ==========================================

function drawCalendar(
    data,
    container,
    eventsContainer,
    year,
    month
) {

    container.innerHTML = "";


    var monthNames = [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember"
    ];


    var title =
        document.getElementById("calendar-month");


    if (title) {

        title.textContent =
            monthNames[month] + " " + year;

    }


    // Wochentage

    var weekdays = [
        "Mo",
        "Di",
        "Mi",
        "Do",
        "Fr",
        "Sa",
        "So"
    ];


    for (var w = 0; w < weekdays.length; w++) {

        var weekday =
            document.createElement("div");

        weekday.className =
            "calendar-weekday";

        weekday.textContent =
            weekdays[w];

        container.appendChild(weekday);
    }


    // Erster Tag des Monats

    var firstDay =
        new Date(year, month, 1);


    var start =
        firstDay.getDay() - 1;


    if (start < 0) {
        start = 6;
    }


    // Leere Felder

    for (var e = 0; e < start; e++) {

        var empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        container.appendChild(empty);
    }


    // Anzahl Tage

    var days =
        new Date(year, month + 1, 0)
            .getDate();


    // Tage erstellen

    for (var day = 1; day <= days; day++) {

        var dayElement =
            document.createElement("div");

        dayElement.className =
            "calendar-day";


        var number =
            document.createElement("span");

        number.textContent =
            day;


        dayElement.appendChild(number);


        // Datum erstellen

        var monthNumber =
            String(month + 1);

        if (monthNumber.length === 1) {
            monthNumber = "0" + monthNumber;
        }


        var dayNumber =
            String(day);

        if (dayNumber.length === 1) {
            dayNumber = "0" + dayNumber;
        }


        var date =
            year + "-" +
            monthNumber + "-" +
            dayNumber;


        // Prüfen, ob Termin vorhanden

        var hasEvent = false;


        for (
            var i = 0;
            i < data.termine.length;
            i++
        ) {

            if (
                data.termine[i].datum === date
            ) {

                hasEvent = true;

                break;
            }
        }


        if (hasEvent) {

            dayElement.classList.add(
                "has-event"
            );

            var eventText =
                document.createElement("small");

            eventText.textContent =
                "Termin";

            dayElement.appendChild(
                eventText
            );
        }


        // Klick auf Tag

        dayElement.onclick = function() {

            var clickedDay =
                this.textContent;

            console.log(
                "Tag ausgewählt:",
                clickedDay
            );

        };


        container.appendChild(
            dayElement
        );
    }


    // Termine anzeigen

    showEvents(
        data,
        eventsContainer
    );
}


// ==========================================
// TERMINE
// ==========================================

function showEvents(
    data,
    container
) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    for (
        var i = 0;
        i < data.termine.length;
        i++
    ) {

        var event =
            data.termine[i];


        var card =
            document.createElement("div");

        card.className =
            "glass-card event-card";


        var date =
            document.createElement("div");

        date.className =
            "event-date";


        var dateObject =
            new Date(
                event.datum + "T00:00:00"
            );


        var day =
            document.createElement("strong");

        day.textContent =
            dateObject.getDate();


        var month =
            document.createElement("span");

        month.textContent =
            dateObject.toLocaleDateString(
                "de-DE",
                {
                    month: "short"
                }
            );


        date.appendChild(day);
        date.appendChild(month);


        var information =
            document.createElement("div");

        information.className =
            "event-information";


        var title =
            document.createElement("h3");

        title.textContent =
            event.titel;


        var time =
            document.createElement("p");

        time.textContent =
            "🕐 " + event.uhrzeit + " Uhr";


        var place =
            document.createElement("p");

        place.textContent =
            "📍 " + event.ort;


        var description =
            document.createElement("p");

        description.textContent =
            event.beschreibung;


        information.appendChild(title);
        information.appendChild(time);
        information.appendChild(place);
        information.appendChild(description);


        card.appendChild(date);
        card.appendChild(information);


        container.appendChild(card);
    }
}


// ==========================================
// KONTAKT
// ==========================================

function showContact(data) {

    if (!data.kontakt) {
        return;
    }


    var address =
        document.getElementById(
            "contact-address"
        );


    if (address) {

        address.textContent =
            data.kontakt.adresse;

    }


    var instagram =
        document.getElementById(
            "contact-instagram"
        );


    if (instagram) {

        instagram.textContent =
            data.kontakt.instagram;

        instagram.href =
            "https://instagram.com/" +
            data.kontakt.instagram.replace("@", "");

    }


    var tiktok =
        document.getElementById(
            "contact-tiktok"
        );


    if (tiktok) {

        tiktok.textContent =
            data.kontakt.tiktok;

        tiktok.href =
            "https://www.tiktok.com/@" +
            data.kontakt.tiktok.replace("@", "");

    }
}
```
