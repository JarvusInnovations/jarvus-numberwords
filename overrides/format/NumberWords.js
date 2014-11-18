Ext.define('Jarvus.util.format.NumberWords',{
    override: 'Ext.util.Format',
    singleton:true,

    ones:[
        '',
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'eleven',
        'twelve',
        'thirteen',
        'fourteen',
        'fiveteen',
        'sixteen',
        'seventeen',
        'eighteen',
        'nineteen'
    ],

    tens:[
        '',
        'twenty',
        'thirty',
        'fourty',
        'fifty',
        'sixty',
        'seventy',
        'eighty',
        'ninety'
    ],

    triplets:[
        '',
        'thousand',
        'millon',
        'billion',
        'trillion'
    ],

    convertNumbersToWords: function(number) {
        var n = (+number);

        if (n < 0)
            return 'minus ' + this.applyConversion(n * (-1), 0);

        if (n == 0)
            return 'zero';

        return this.applyConversion(n, 0);
    },

    applyConversion: function(num, tri) {
        var r,
            x,
            y,
            str = '',
            gap = ' ';

        r = Math.floor(num / 1000);
        x = Math.floor(num / 100) % 10;
        y = num % 100;

        // do hundreds
        if (x == 1){
            str = this.ones[x] + gap + 'hundred';
        }
        else if (x > 0){
            str = this.ones[x] + gap + 'hundreds';
        }

        // do ones and tens
        if (y < 20){
            str = str + gap + this.ones[y];
        } else{
            str = str + gap + this.tens[parseInt(y / 10) -1] + gap + this.ones[y % 10];
        }

        // add triplet modifier only if there
        // is some output to be modified...
        if (str != ''){
            str = str + gap +this.triplets[tri];
        }

        // continue recursing?
        if (r > 0)
            return this.applyConversion(r, tri + 1) + gap + str.trim();
        else
            return str.trim();
    }
});