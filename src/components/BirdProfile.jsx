import React from 'react'
import {Container,BirdImage,OnlyBackground,BirdDescription,
    NameLabel,RealName,Name,Bottom,Last,
    LocationLabel,DateLabel} from '../components/BirdProfileStyles';

const BirdProfile = ({obj}) => {
  return (
    <Container>
        <BirdImage img={obj.image}>
            <OnlyBackground stat={obj.status}>
                    {
                        obj.commonName
                    }
            </OnlyBackground>
        </BirdImage>
        <BirdDescription>
                <Name>
                    <NameLabel>
                            Name
                    </NameLabel>
                    <RealName>
                        {
                            obj.commonName
                        }
                    </RealName>
                </Name>
                <Bottom>
                    <Last>
                        Last Seen
                    </Last>
                    <LocationLabel>
                        {
                            obj.spotLocation
                        }
                    </LocationLabel>
                    <DateLabel>
                        {
                            obj.spotDate
                        }
                    </DateLabel>
                </Bottom>
        </BirdDescription>
    </Container>
  )
}

export default BirdProfile
