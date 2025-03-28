// BlormFissionCalc //////////////////////////////////////////////////////////


// how many divisions by 10 until <10
function log10i(x){
	let r = 0;
	while (x >= 10){
		x = x / 10 | 0;
		r++;
	}
	return r;
}

// 10 to the power of x
function e(x){
	return Math.pow(10, x);
}

// the blorm fraction.
function blormFraction(x,y){
	let a = x * e(log10i(y) + 1) + y;
	let l = log10i(a);
	
	let A = a;
	let f = 0;
	let d = 0;
	while(A !== 0){
		d = A % 10;
		f = f * 10 + d;
		A = A / 10 | 0
	}
	
	let b = f % 10 * e(l) + (f / 10 | 0);
	let r = 0;
	for (let i=0; i<=l; i++){
		r += e(i) * ((a % 10 - b % 10 + 10) % 10);
		a = a / 10 | 0;
		b = b / 10 | 0;
	}
	return `${r}/${x+y}`;
}

// the blorm decimal.
function blormDecimal(x,y){
	let a = blormFraction(x,y).split('/');
	return a[0] / a[1];
}

// blorm fraction reduced to simplest form.
function reduce(n, d){ // thank you stackOverflow
	var a = n;
	var b = d;
	var c;
	while (b){
		c = a % b; a = b; b = c;
	}
	return `${n/a}/${d/a}`;
}

function simplestBlorm(x,y) {
	let a = blormFraction(x,y).split('/');
	return reduce(a[0],a[1]);
}

// this is a test to see if the function works correctly:
document.getElementById("blorm").addEventListener("click", () => {
	document.getElementById("results").innerHTML = `
	True Fraction: ${blormFraction(Number(document.getElementById("blx").value), Number(document.getElementById("bly").value))}<br>
	Simplest Form: ${simplestBlorm(Number(document.getElementById("blx").value), Number(document.getElementById("bly").value))}<br>
	Decimal Form: ${blormDecimal(Number(document.getElementById("blx").value), Number(document.getElementById("bly").value))}
	`;
});