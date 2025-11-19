function printStars1() {
            let output = "";
            for(let i = 0; i < 5; i++){
                if(i > 0){
                    output += "<BR>";
                }
                for(let j = 0; j < 5 - i; j++){
                    output += '*';
                }
            }

            document.getElementById("stars").innerHTML = output;
        }

        function printStars2() {
            let output = "";
            for(let i = 0; i < 5; i++){
                if(i > 0){
                    output += "<BR>";
                }
                for(let j = 0; j < i+1; j++){
                    output += '*';
                }
            }
            document.getElementById("stars").innerHTML = output;
        }

        function printStars3() {
            let output = "";
            for(let i = 0; i < 5; i++){
                if(i>0){
                    output += "<BR>";
                }
                for(let j = 0; j < 4-i; j++){
                    output +='&nbsp;';
                }
                for(let j = 0; j < i+1; j++){
                    output += '*';
                }
            }
            document.getElementById("stars").innerHTML = output;
        }

        function printStars4() {
            let output = "";
            for(let i = 0; i < 5; i++){
                if(i > 0){
                    output += "<BR>";
                    for(let j = 0; j < i; j++){
                        output +='&nbsp;';
                    }
                }
                for(let j = 0; j < 5 - i; j++){
                    output += '*';
                }
            }

            document.getElementById("stars").innerHTML = output;
        }