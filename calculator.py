d = 14776367535688
r = 12.5*6*24*7

def hr_to_btc(hr, d, r):
    ''' int, int -> float 
    Calculates the expected mine assets a according to a hash rate h
    '''
    ghr = d * 2**32 / 600
    a = hr / ghr * r

    return a

h = 1.0577336
x = hr_to_btc(h, d, r)
print(x)

def btc_to_btc(a, d, r):
    ''' int, int -> float 
    Calculates the expected mine assets a according to a hash rate h
    '''
    ghr = d * 2**32 / 600
    hr = (a/r) * ghr

    return hr

