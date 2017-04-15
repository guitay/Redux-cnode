import React from 'react';
import {
	connect
} from 'react-redux';
import {
	ActivityIndicator
} from 'antd-mobile';
import actions from '../actions/actions';
import Content from '../components/Article/Content/Content';
import Comment from '../components/Article/Comment/Comment';
import {
	NavBar,
	Icon
} from 'antd-mobile';
let gotoLogin;
class Article extends React.Component {
	constructor(...arg) {
		super(...arg);
		this.like = this.like.bind(this);
		this.comment = this.comment.bind(this);
	}
	componentDidMount() {
		const {
			dispatch,
			params
		} = this.props;
		dispatch(actions.request_article(params.id))
	}
	like(accesstoken, commentid, key, indexup, topicid) {
		const {
			dispatch
		} = this.props;
		dispatch(actions.request_upComment(accesstoken, commentid, key, indexup, topicid))
	}
	comment(accesstoken, topicid, content, commentid) {
		const {
			dispatch
		} = this.props;
		dispatch(actions.request_commentArticle(accesstoken, topicid, content, commentid));
	}
	render() {
		console.log(this)
		let {
			Article,
			Login,
			dispatch
		} = this.props;
		//eval('method("myinfo")'); //调用函数，传入参数
		return (
			<div>
				<NavBar  onLeftClick={() => history.go(-1)}>
					详情
    			</NavBar>
    			{Article.data.id?<div><Content dispatch={dispatch} Login={Login} actions={actions} Article={Article}/><Comment like={this.like} comment={this.comment}  dispatch={dispatch} actions={actions} Article={Article} Login={Login}/></div>:<ActivityIndicator size="large" />}
			</div>
		)
	}
}

function ArticleSelect(state) {
	let {
		Article,
		Login
	} = state
	return {
		Article,
		Login
	}
}
export default connect(ArticleSelect)(Article)