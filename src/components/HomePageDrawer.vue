<template>
	<div>
		<md-toolbar
			class="md-transparent"
			md-elevation="0"
			style="padding-left:20%;"
		>
			<span class="android-title mdl-layout-title">
				<img
					style="height:37px"
					class="android-logo-image"
					src="@/assets/images/android-logo.png"
				/>
			</span>
		</md-toolbar>

		<md-divider></md-divider>
		<md-list style="padding-top:20%">
			<button id="btn-drawer" @click="editprofile">
				<md-list-item>
					<md-icon>edit</md-icon>
					<span class="md-list-item-text">Edit profile</span>
				</md-list-item>
			</button>
			<button id="btn-drawer" @click="logout">
				<md-list-item>
					<md-icon>login</md-icon>
					<span class="md-list-item-text">Logout</span>
				</md-list-item>
			</button>
		</md-list>
	</div>
</template>

<script>
import actions from "@/common/actions.js";
export default {
	data: () => ({
		menuVisible: false,
	}),
	methods: {
		editprofile() {
			this.$emit("editprofile");
		},
		logout() {
			actions.fireLoggedOut(this.$swal, this.$router);
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../styles/questioncard.css";
.md-drawer {
	width: 230px;
	max-width: calc(100vw - 125px);
}
#btn-drawer {
	border: none;
	background-color: white;
	cursor: pointer;
}
</style>
