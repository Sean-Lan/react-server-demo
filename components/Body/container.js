import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Body from './view';
import { fetchColor } from './actions';


const mapStateToProps = (state) => {
  return {
    name: 'body',
    height: '300px',
    color: state.body.color,
    isUpdating: state.body.isUpdating
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    changeColor: fetchColor
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Body);

