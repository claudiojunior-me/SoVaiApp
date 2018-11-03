import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Button from '../components/Button';
import Container from '../components/Container';
import InputText from '../components/InputText';

import { login } from '../actions/authActions';

const Logo = styled.Image`
  height: 150;
  margin-vertical: 30;
  width: 150;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 305;
`;

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };
  }

  onSingInSuccess(user) {
    const { navigation } = this.props;
    console.log({ user });
    navigation.navigate('ListScrn');
  }

  onSingInError(error) {
    console.log(error);
  }

  navigateToSingUp = () => {
    const { navigation } = this.props;
    navigation.navigate('SingUp');
  };

  singIn = () => {
    const { login } = this.props;
    console.log('logando...');
    login(this.state, this.onSingInSuccess.bind(this), this.onSingInError);
  };

  render() {
    const { email, password } = this.state;

    return (
      <Container>
        <Logo source={require('../assets/icon.png')} />
        <View>
          <InputText placeholder="Email" textValue={email} onChange={value => this.setState({ email: value })} />
          <InputText
            isSecure
            placeholder="Senha"
            textValue={password}
            onChange={value => this.setState({ password: value })}
          />

          <ButtonsContainer>
            <Button text="CADASTRAR" onPress={this.navigateToSingUp} />
            <Button primary text="ENTRAR" onPress={() => this.singIn()} />
          </ButtonsContainer>
        </View>
      </Container>
    );
  }
}

SingIn.propTypes = {
  login: PropTypes.any.isRequired,
  navigation: PropTypes.any.isRequired,
};

// Connect everything
export default connect(
  null,
  { login },
)(SingIn);