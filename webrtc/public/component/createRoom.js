exports = {
	name: 'CreateCourse',
	data() {
		return {
			roomName: '',
			roomPwd: '',
			checkPassword: ''
		};
	},
	methods: {
		onClickCreate() {
			if (!this.roomName) {
				alert('房间名称不能为空!')
				return;
			} else if (this.roomName.length > 15) {
				alert('房间名称太长');
				return;
			} else if (!this.roomPwd) {
				alert('密码不能为空');
				return;
			} else if (this.roomPwd !== this.checkPassword) {
				alert('两次密码输入不相同');
				return;
			} else {
				// $ajax('../kshWs/webRTCAction/createRoom', {
				// 	roomName: this.roomName,
				// 	roomPwd: this.roomPwd
				// }, data => {

				// })
				this.$rtc.addRoom(this.roomName, this.roomPwd)
			}
		},
		onClickCancel() {
			// console.log(111111)
			this.$router.go(-1);
			// this.$router.push('/');
		}
	}
};