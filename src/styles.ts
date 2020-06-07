import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	body {
		font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
	}

	:focus {
		outline: 0;
	}

	button {
		margin: 0;
    padding: 0;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    -webkit-appearance: none;
    appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .markerLow {
    display:block;
    width: 30px;
    height: 30px;
    background-color: green;
    border-radius: 100%;
    float: right;
    margin-right:-45px;
    
  }

  .markerMedium {
    display:block;
    width: 30px;
    height: 30px;
    background-color: orange;
    border-radius: 100%;
    float: right;
    margin-right:-45px;
  }

  .markerHigh {
    display:block;
    width: 30px;
    height: 30px;
    background-color: red;
    border-radius: 100%;
    float: right;
    margin-right:-45px;
  }

  .markerPurple {
  position: relative;
  float:right;
  margin-right: -33px;
  width: 15px;
  height: 25px;
  background-color: purple;
  box-shadow: -1px 0px 2px #444;  
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 50px 50px 0 0;
  -webkit-transform: rotate(315deg);
  -moz-transform: rotate(315deg);
  -ms-transform: rotate(315deg);
  -o-transform: rotate(315deg);
  transform: rotate(315deg);
  transition: 0.5s;
  }

  .markerPurple:before {
    position: absolute;
  width: 25px;
  height: 15px;
  left: 0;
  bottom: 0;
  content: "";
  background-color: purple;
  box-shadow: 0px 3px 3px #444444; 
  -webkit-border-radius: 50px 50px 0 0;
  -moz-border-radius: 50px 50px 0 0;
  border-radius: 0 50px 50px 0;
  transition: 0.5s;
  }

  .markerPurple:hover:before, .markerPurple:hover {
    box-shadow:none;
  }
`
