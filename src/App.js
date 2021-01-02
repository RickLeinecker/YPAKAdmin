import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Button } from 'react-bootstrap';
import firebase from './store/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import store from './store/store';
import AppContext from './AppContext';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Users from './pages/Users/Users';
import Surveys from './pages/Surveys/Surveys';
import Videos from './pages/Videos/Videos';
import ProtectedRoute from './containers/ProtectedRoute';

function App() {

	// On path / redirect to login if auth
	// Otherwise, redirect to admin hub

	// No navbar for now
	return (
		<>
			<Provider store={store}>
				<Router>
					<AppContext>
						<Switch>
							<ProtectedRoute path='/landing' exact component={Landing}></ProtectedRoute>
							<Route path='/login/forgot' exact component={ForgotPassword}></Route>
							<Route path='/login' exact component={Login}></Route>
							<ProtectedRoute superOnly path='/users' exact component={Users}></ProtectedRoute>
							<ProtectedRoute path='/surveys' exact component={Surveys}></ProtectedRoute>
							<ProtectedRoute path='/videos' exact component={Videos}></ProtectedRoute>
							<Route path='/*'><Redirect to='/landing' /></Route>
						</Switch>
					</AppContext>
				</Router>
			</Provider>
		</>
	)
}

export default App;


// function App() {

// 	const [users, setUsers] = useState(undefined);

// 	useEffect(() => {
// 		const fetchData = async () => {
// 			const db = firebase.firestore();
// 			const data = await db.collection("CongressIDs").get();
// 			const users = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
// 			setUsers(users);
// 			console.log(users);
// 		}

// 		fetchData();
// 	}, [])

// 	return (
// 		<>
// 			<Button>Testing </Button>
// 			{
// 				!users ?
// 					<>Loading...</>
// 					:
// 					<ul>
// 						{users.map(user => (
// 							<li key={user.ID}>
// 								{user.First} {user.Last}
// 							</li>
// 						))}
// 					</ul>
// 			}
// 		</>
// 	)
// }



// !users ?
// 	<>Loading...</>
// 	:
// 	<ul>
// 		{users.map(user => (
// 			<li key={user.email}>
// 				{user.name}
// 			</li>
// 		))}
// 	</ul>