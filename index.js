document.addEventListener("DOMContentLoaded", () => {

    const titles = ['素', '素因', '素因数', '素因数分', '素因数分解', '素因数分解'];
    let index = 0;
    setInterval(() => {
        document.title = titles[index];
        index = (index + 1) % titles.length;
    }, 500);

    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23];
    let 合成数;
    let correctFactors;
    let スコア = 0;
    let タイマー;
    let 制限時間 = 60;
    let gameActive = false;

    function generateComposite() {
        let primeFactors = [];
        let numFactors = Math.floor(Math.random() * 3) + 2;
        for (let i = 0; i < numFactors; i++) {
            let randomPrime = primes[Math.floor(Math.random() * primes.length)];
            primeFactors.push(randomPrime);
        }
        合成数 = primeFactors.reduce((a, b) => a * b, 1);
        correctFactors = primeFactors;
        document.getElementById('合成数').textContent = 合成数;
    }

    function checkFactors() {
        const input = document.getElementById('入力数字').value;
        const inputFactors = input.split(' ').map(Number);

        inputFactors.sort((a, b) => a - b);
        correctFactors.sort((a, b) => a - b);

        const isCorrect = inputFactors.length === correctFactors.length &&
                          inputFactors.every((value, index) => value === correctFactors[index]);

        const resultDiv = document.getElementById('result');
        if (isCorrect) {
            const points = correctFactors.reduce((a, b) => a + b, 0);
            スコア += points;
            document.getElementById('スコア').textContent = スコア;
            resultDiv.innerHTML = `<p class="correct">Correct! +${points} points</p>`;
            generateComposite();
            document.getElementById('入力数字').value = '';
        } else {
            resultDiv.innerHTML = `<p class="incorrect">Incorrect!</p>`;
        }
    }

    function startTimer() {
        if (!gameActive) {
            gameActive = true;
            タイマー = setInterval(() => {
                if (制限時間 > 0) {
                    制限時間--;
                    document.getElementById('制限時間').textContent = 制限時間;
                } else {
                    clearInterval(タイマー);
                    gameActive = false;
                    document.getElementById('result').innerHTML = `<p>Time's up! Final score is ${スコア}</p>`;
                }
            }, 1000);
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 's' || event.key === ' ' ,'1' ,'2' ,'3' ,'4' ,'5' ,'6' ,'7' ,'8' ,'9') {
            startTimer();
        }
    });

    document.getElementById('入力数字').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            checkFactors();
        }
    });

    generateComposite();
});