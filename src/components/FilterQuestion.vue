<template>
	<div>
		<form novalidate @submit.prevent="validateUser">
			<md-card class="md-layout-item md-size-95 md-small-size-95">
				<md-card-header>
					<div class="md-title">
						<md-icon>filter_list</md-icon> Apply filters
					</div>
				</md-card-header>
				<md-card-content>
					<div class="md-layout md-gutter">
						<div class="md-layout-item md-small-size-100">
							<md-field :class="getValidationClass('subject')">
								<label for="subject">Subject</label>
								<md-select
									name="subject"
									id="subject"
									v-model="form.subject"
									md-dense
								>
									<md-option value="1"
										>Literature and Writing (9th grade))</md-option
									>
									<md-option value="2"
										>World Literature and Writing (10th grade)
									</md-option>
									<md-option value="3"
										>American Literature and Writing (Regular and Honors)
									</md-option>
									<md-option value="4">Algebra 1 </md-option>
									<md-option value="5"
										>Geometry (Regular and Enriched)
									</md-option>
									<md-option value="6"
										>Algebra 2 (With or without trigonometry)
									</md-option>
									<md-option value="7"
										>Pre-Calculus (Regular and Honors)
									</md-option>
									<md-option value="8">AP®️ Calculus AB </md-option>
									<md-option value="9">AP®️ Calculus BC </md-option>
									<md-option value="10">AP®️ Statistics</md-option>
									<md-option value="11">Economics</md-option>
									<md-option value="12">Spanish 1 </md-option>
									<md-option value="13">Spanish 2 </md-option>
									<md-option value="14">Spanish 3 </md-option>
									<md-option value="15">Biology </md-option>
									<md-option value="16"
										>Chemistry (Regular and Honors)
									</md-option>
									<md-option value="17">AP®️ Physics I </md-option>
									<md-option value="18"
										>World Core History (10th grade)
									</md-option>
									<md-option value="19">AP®️ World History </md-option>
									<md-option value="20">AP®️ US History</md-option>
								</md-select>
								<span class="md-error">The Subject is required</span>
							</md-field>
						</div>

						<div class="md-layout-item md-small-size-100">
							<md-field :class="getValidationClass('topic')">
								<label for="topic">Topic</label>
								<md-input name="topic" id="topic" v-model="form.topic" />
								<span class="md-error" v-if="!$v.form.topic.required"
									>The topic is required</span
								>
								<span class="md-error" v-else-if="!$v.form.topic.minlength"
									>Invalid topic.</span
								>
							</md-field>
						</div>
					</div>
				</md-card-content>

				<md-card-actions>
					<md-button
						type="button"
						class="md-primary"
						@click="clearFilters()"
						v-if="filters"
						>Clear filters</md-button
					>
					<md-button type="submit" class="md-primary">Search</md-button>
				</md-card-actions>
			</md-card>
		</form>
	</div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import actions from "@/common/actions.js";

export default {
	name: "FormValidation",
	mixins: [validationMixin],
	data: () => ({
		position: "left",
		filters: false,
		form: {
			subject: null,
			topic: null,
		},
	}),
	validations: {
		form: {
			subject: {
				required,
			},
			topic: {},
		},
	},
	methods: {
		clearFilters() {
			this.$emit("clearFilter");
			this.filters = false;
		},
		getValidationClass(fieldName) {
			const field = this.$v.form[fieldName];
			if (field) {
				return {
					"md-invalid": field.$invalid && field.$dirty,
				};
			}
		},
		actionPostQuestion() {
			const formValues = this.form;
			if (formValues["topic"] == null) {
				formValues["topic"] = "";
			}
			actions.checkSignedIn();
			const data = JSON.stringify(formValues);
			this.$emit("doFilter", data);
		},
		validateUser() {
			this.filters = true;
			this.$v.$touch();
			if (!this.$v.$invalid) {
				this.actionPostQuestion();
			}
		},
	},
};
</script>
