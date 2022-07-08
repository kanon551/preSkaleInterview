import React from 'react'
import {Container,BirdImage,OnlyBackground,BirdDescription,
    NameLabel,RealName,Name,Bottom,Last,
    LocationLabel,DateLabel} from '../components/BirdProfileStyles';

const BirdProfile = ({obj}) => {

    const convertBackendDateToFront = (value) => {
        var date = new Date(value.replace('IST', ''));
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        const changeddate = month+"/"+day+"/"+year
        return changeddate;
      }

      

  return (
    <Container>
        <BirdImage img={`data:image/jpeg;base64,${obj.image.data}`}>
            <OnlyBackground stat={obj.status}>
                    {
                        obj.status
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
                            obj.spottedLocation
                        }
                    </LocationLabel>
                    <DateLabel>
                        {
                            convertBackendDateToFront(obj.spottedDate)
                        }
                    </DateLabel>
                </Bottom>
        </BirdDescription>
    </Container>
  )
}

export default BirdProfile
