import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DogForm from '../dogForm/dogForm';
import * as dogAction from '../../action/dogAction';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.dogsFetch();
  }

  render() {
    const { 
      dogs, 
      dogCreate, 
      dogUpdate, 
      dogDelete, 
    } = this.props;

    return (
      <div className="dashboard">
        <h2>Add a Dog To the Site!</h2>
        <DogForm onComplete={dogCreate}
          buttonText={'Create'}
        />
        <div className="body">
        <h2>Dog Availability</h2>
        {
          // dogs === undefined ? null : (
          dogs.map((dog) => {
            return (
              <div key={dog._id}>
                <p>{dog.firstName}</p>
                <p>{dog.breed}</p>
                <p>{dog.age}</p>
                <p>{dog.location}</p>
                <p>{dog.details}</p>
                <DogForm onComplete={dogUpdate} buttonText={'Update'} dog={dog}/>
                <button className="delete" onClick={() => dogDelete(dog)}>Delete</button>
              </div>
            );
          })
        }
      </div>
    </div>
    );
  }
}

Dashboard.propTypes = {
  dogs: PropTypes.array,
  dogCreate: PropTypes.func,
  dogUpdate: PropTypes.func,
  dogDelete: PropTypes.func,
  dogsFetch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    dogs: state.dog,
  };
};

const mapDispatchToProps = dispatch => ({
  dogsFetch: () => dispatch(dogAction.dogsFetchRequest()),
  dogUpdate: dog => dispatch(dogAction.dogUpdateRequest(dog)),
  dogCreate: dog => dispatch(dogAction.dogCreateRequest(dog)),
  dogDelete: dog => dispatch(dogAction.dogDeleteRequest(dog)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
