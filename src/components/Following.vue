<template>
	<div style="min-height: 650px">
		<div v-if="showLoader">
			<md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
			<h4>Loading Data</h4>
		</div>

		<div v-for="item in questions" :key="item.questionId">
			<QuestionCard
				:item="item"
				:subject="item.subject"
				:topic="item.topic"
				:dateOfPosted="item.createDate"
				:questionDesc="item.questionDesc"
				:answerList="item.answerList"
				:questionId="item.questionId"
				:noOfAnswers="item.noOfAnswers"
				:noOfLikes="item.noOfLikes"
				:noOfFollowers="item.noOfFollowers"
				v-on:actionReload="getData"
				disabled
			/>
		</div>

		<div v-if="dataNotFound">
			<DataNotFound message="You're not following any question." />
		</div>
	</div>
</template>

<script>
import QuestionCard from "@/components/QuestionCard.vue";
import DataNotFound from "@/components/DataNotFound.vue";
import axios from "axios";
import actions from "@/common/actions.js";
import utilities from "@/common/utilities.js";
import properties from "@/common/properties.js";
export default {
	name: "HomePage",
	components: {
		QuestionCard,
		DataNotFound,
	},
	beforeMount() {
		this.getData();
	},
	methods: {
		getData() {
			var config = {
				method: "post",
				url:
					properties.baseUrl() +
					"/findallbyfollower/" +
					utilities.getUserId(this.$router),
				headers: utilities.getAuthJSONHeader(this.$router, this.$swal),
			};
			axios(config)
				.then((response) => {
					if (!response.data.length) {
						this.dataNotFound = true;
					} else {
						this.dataNotFound = false;
					}
					this.questions = response.data;
					this.showLoader = false;
				})
				.catch((error) => {
					if (
						error.response.data.code == 401 ||
						error.response.data.code == 555
					) {
						actions.fireLoggedOut(this.$swal, this.$router);
						return;
					}
				});
		},
	},
	data: () => ({
		questions: null,
		showLoader: true,
		dataNotFound: false,
	}),
};
</script>

<style scoped>
.questtext {
	padding: 10px;
}
.customcard {
	cursor: pointer;
	font-size: 14px;
	transition-property: all;
	transition-duration: 0.7s;
}
.customcard:hover {
	border-radius: 15px;
	color: white;
	background-color: #57606f;
	font-size: 16px;
	transition-property: all;
	transition-duration: 0.7s;
}
.md-dialog ::v-deep .md-dialog-container {
	width: 40%;
}
</style>
