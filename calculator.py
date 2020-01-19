def hr_to_btc(hr, d, r):
    ''' int, int, int -> float 
    Calculates the expected mine assets a according to a hash rate h
    '''
    ghr = d * 2**32  / ( t )  # EH/s = H * 10^18  /s
    a = hr / ghr * r

    return a

def btc_to_hr(a, d, r):
    ''' int, int, int -> float 
    Calculates the expected mine assets a according to a hash rate h
    '''
    ghr = d * 2**32 / (t)
    hr = (a/r) * ghr

    return hr

def btc_to_dollar(btc):
    dollar_one_btc = 8938.65
    return dollar_one_btc * btc
    

if __name__ == '__main__':
    d = 14776367535688  # bits
    r = 12.5    # bitcoin
    t = 84600
    h = 2367890000 