import { useState , useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { UseDataContext } from "../context/SiteContext";
import Button from '../ui/Button'

function SingleGroup() {

    const { groupData } = UseDataContext();
    const { groupId } = useParams();
    const navigate = useNavigate();

    const singleGroup = groupData.find(group => group.id === groupId)

    return (
        <div>
            <h1>{singleGroup.name}</h1>
            <p>{singleGroup.budget}</p>
            <p>{singleGroup.description}</p>
            <Button
                variant={"small"} 
                onClick={() => navigate('/groups')}
                className={'bg-accent'}>
                Back
            </Button>
        </div>
    )
}

export default SingleGroup;