var $document = $(document);

var problemStorage = [];
var problemCounter = 1;

const ArtihmeticFunction = Object.freeze({"add":"+", "subtract":"-", "multiply":"*", "divide":"/"});

$document.on("click", "#calculate", function(e) {
    e.preventDefault();

    const min1 = parseInt($document.find("input[name='firstmin']").val());
    const max1 = parseInt($document.find("input[name='firstmax']").val());

    const min2 = parseInt($document.find("input[name='secondmin']").val());
    const max2 = parseInt($document.find("input[name='secondmax']").val());

    const operation = $document.find("#operator").val();
    const $problems = $document.find("#problems");
    const $key = $document.find("#key");
    const numProblems = parseInt($document.find("input[name='howmany']").val());
    const useDecimal = $document.find("input[name='useDecimals']:checked").val() === "true";

    $document.find(".results-area").removeClass("hide-results-area");

    for (var i = 0; i < numProblems; i++) {
        const number1 = getRandomNumber(min1, max1, useDecimal);
        const number2 = getRandomNumber(min2, max2, useDecimal);

        var answer;

        switch (operation) {
            case "add":
                answer = basicArithmetic(ArtihmeticFunction.add, number1, number2);
                problemStorage.push([number1, "+", number2, "=", answer]);
                $problems.append(problemCounter + ") " + number1 + " + " + number2 + "<br/>");
                $key.append(problemCounter + ") " + answer + "<br/>");
                break;
            case "subtract":
                answer = basicArithmetic(ArtihmeticFunction.subtract, number1, number2);
                problemStorage.push([number1, "-", number2, "=", answer]);
                $problems.append(problemCounter + ") " + number1 + " - " + number2 + "<br/>");
                $key.append(problemCounter + ") " + answer + "<br/>");
                break;
            case "multiply":
                answer = basicArithmetic(ArtihmeticFunction.multiply, number1, number2);
                problemStorage.push([number1, "x", number2, "=", answer]);
                $problems.append(problemCounter + ") " + number1 + " x " + number2 + "<br/>");
                $key.append(problemCounter + ") " + answer + "<br/>");
                break;
            case "divide":
                answer = basicArithmetic(ArtihmeticFunction.divide, number1, number2);
                problemStorage.push([number1, "/", number2, "=", answer]);
                $problems.append(problemCounter + ") " + number1 + " &#247; " + number2 + "<br/>");
                $key.append(problemCounter + ") " + answer + "<br/>");
                break;
            default:
                alert("You shouldn't see this...something bad happened.");
                return;
        }

        problemCounter++;
    }
});

$document.on("click", "#exportResults", function(e) {
    e.preventDefault();

    exportToCsv("GeneratedMathResults.csv", "text/csv;encoding:utf-8");
});

var getRandomNumber = function(min, max, useDecimal) {
    if (!useDecimal) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        return Math.floor(Math.random() * (max * 100 - min * 100)) / (min * 100);
    }
}

var basicArithmetic = function (op, x, y) {
    var n = {
        '*': x * y,
        '-': x - y,
        '+': x + y,
        '/': x / y
    }[op];

    return Math.round(n * 100) / 100;
}

var exportToCsv = function(fileName, mimeType) {
    var csv = "";
    problemStorage.forEach(function(v, i) {
        dataString = v.join(',');
        csv += i < problemStorage.length ? dataString + "\n" : dataString;
    });

    var a = document.createElement("a");
    mimeType = mimeType || "application/octet-stream";

    a.href = URL.createObjectURL(new Blob([csv], {
        type: mimeType
    }));

    a.setAttribute("download", fileName);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}