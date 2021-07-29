import React from 'react'
import Icon1 from '../../Images/svg-2.svg'
import Icon2 from '../../Images/svg-2.svg'
import Icon3 from '../../Images/svg-2.svg'
import {ServicesContainer, 
    ServicesH1, 
    ServicesWrapper, 
    ServicesCard, 
    ServicesIcon, 
    ServicesH2, 
    ServicesP
} from './ServicesElements'

const Services = () => {
    return (
        <ServicesContainer id='services'>
            <ServicesH1> Our Services </ServicesH1>
                <ServicesWrapper>
                    <ServicesCard>
                    <ServicesIcon src={Icon1}/>
                        <ServicesH2> H2 Heading  </ServicesH2>
                            <ServicesP>
                                I am a paragraph. Write on me. shfskdnfslkdfsdnf;kshdfnsd sdnfsdnfklsdhfsd.
                            </ServicesP>
                    </ServicesCard>
                    <ServicesCard>
                    <ServicesIcon src={Icon2}/>
                        <ServicesH2> H2 Heading </ServicesH2>
                            <ServicesP>
                                I am a paragraph. Write on me. shfskdnfslkdfsdnf;kshdfnsd sdnfsdnfklsdhfsd.
                            </ServicesP>
                    </ServicesCard>
                    <ServicesCard>
                    <ServicesIcon src={Icon3}/>
                        <ServicesH2> H2 Heading </ServicesH2>
                            <ServicesP>
                                I am a paragraph. Write on me. shfskdnfslkdfsdnf;kshdfnsd sdnfsdnfklsdhfsd.
                            </ServicesP>
                    </ServicesCard>
                </ServicesWrapper>
        </ServicesContainer>
    )
}

export default Services
