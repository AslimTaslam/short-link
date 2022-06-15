import { Component } from "react";
import ErrorIndicator from "./ErrorIndicator";

export default class ErrorBoundary extends Component {
	state = {
		hasError: false,
	};

	componentDidCatch() {
		this.state({
			hasError: true,
		});
	}

	render() {
		if (this.state.hasError) {
			return <ErrorIndicator />;
		}

		return this.props.children;
	}
}
