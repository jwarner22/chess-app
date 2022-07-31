import styled from 'styled-components'

export const InfoContainer = styled.div`
    color: #fff;
    background: ${({lightBg}) => (lightBg ? '#f6f9fc' : '#fff')};
    border-radius: 15px;
    ;

    @media screen and (max-width: 768px) {
        padding: 40px 0;
    }
`

export const InfoWrapper = styled.div`
    display: grid;
    z-index: 1;
    min-height: 720px;
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center;
`

export const InfoRow = styled.div`
    display: grid;
    grid-auto-columns: minmax(auto, 1fr);
    align-items: center;
    grid-template-areas: ${({imgStart}) => (imgStart ? `'col2 col1'` : `'col1 col2'`)};

    @media screen and (max-width: 768px) {
        grid-template-areas: ${({imgStart}) => (imgStart ? `'col1'
        'col2'` : `'col1' 'col1' 'col2' 'col2'`)}
    }
`

export const Column1 = styled.div`
    margin: 15px 0px;
    padding: 0 15px;
    grid-area: col1;

`

export const Column2 = styled.div`
    margin: 15px 0px;
    padding: 0 15px;
    grid-area: col2;
    
`

export const TextWrapper = styled.div`
    max-width: 540px;

`

export const TopLine = styled.p`
    color: #247cf1;
    font-size: 16px;
    line-height: 16px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 16px;
`

export const Heading = styled.h1`
    margin-bottom: 24px;
    font-size: 48px;
    line-height: 1.1;
    font-weight: 600;
    color: ${({lightText}) => (lightText ? '#54606c' : '#54606c')};

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

export const Subtitle = styled.p`
    max-width: 440px;
    margin-bottom: 35px;
    font-size: 18px;
    line-height: 24px;
    color: ${({darkText}) => (darkText ? '#54606c' : '#54606c')};
`

export const BtnWrap = styled.div`
    display: flex;
    justify-content: flex-start;
`

export const ImgWrap = styled.div`
    max-width: 555px;
    height: 100%; 
`

export const Img = styled.img`
    width: 100%;
    margin: 0 0 10px 0;
    padding-right: 0;
`

export const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`