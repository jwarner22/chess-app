import React from 'react';
import BenefitsContainer from '../BenefitsContainer';
import {Modules} from '../PostLogin/Views/PatternRecognition/CourseTiles/Data';
import {benefitsData} from "../../../../../data/BenefitsData"

function BenefitsList({benefitsData, type}) {
    if (props.type === 'endgame') {
        return (
            <div>
                Need endgame benefits
            </div>
        )
    }
}


function sortedBenefits = (BenefitsContainer) => {
    return function (props) {
        if (props.type === 'endgame') {
            return (
                <div>
                    Need endgame benefits
                </div>
            )
        }
    }
}