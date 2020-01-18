def hr_to_btc(hr, d, r):
    ''' int, int -> float 
    Calculates the expected mine assets a according to a hash rate h
    '''
    ghr = d * 2**32  / ( t )  # EH/s = H * 10^18  /s
    a = hr / ghr * r

    return a

def btc_to_hr(a, d, r):
    ''' int, int -> float 
    Calculates the expected mine assets a according to a hash rate h
    '''
    ghr = d * 2**32 / (t*10**18)
    hr = (a/r) * ghr

    return hr

if __name__ == '__main__':
    d = 14776367535688  # bits
    r = 12.5*6*24*7     # bitcoin
    t = 84600
    h = 200000
    print(hr_to_btc(h, d, r))
