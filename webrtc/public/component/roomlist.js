exports = {
	name: "CourseList",
	// data() {
	// 	return {
	// 	};
	// },
	computed: {
	    courseItems(){
	    	return Object.values(this.$rtc.roomList)
	    }
    },
	methods: {
		join(roomInfo) {
			this.$router.push({
				path: 'main',
				query: {
					roomName: encodeURIComponent(roomInfo.roomName),
					roomId: roomInfo.roomId
				}
			})
			return;
		},
		onCreateButtonClick() {
			this.$router.push({
				path: 'create'
			})
		}
	},

};