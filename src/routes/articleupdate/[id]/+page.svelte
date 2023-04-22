<script>
	//imports
	import articles from '$lib/stores/articles';
	import user from '$lib/stores/user';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/UI/Button.svelte';
	
	//params
	import { page } from '$app/stores';
	let { id } = $page.params;
	id = id === 'AddNewArticle' ? null : id;


	  //vars
  let articleHeadline = '';
  let articlePublisher = '';
  let articleDate = '';
  let image_url = '';
  let articleLocation = '';
  let articleAuthor = '';
  let articleText = '';
  let articleSummary = '';
  let articlePrice = 0;
  let articleBuyout = 0;
  let articleuser = $user.userId;

  const testing = true;
	if (testing) {
		articleHeadline = 'test projectname';
		articlePublisher = 'test publisher';
		articleDate = 'test description';
		image_url =
			' https://res.cloudinary.com/ds5ocfupm/image/upload/v1668286467/flip/newproj_pqfu3l.jpg';
		articleLocation = 'test location';
		articleAuthor = "James Doe";
		articleText = " Lorem ipsum dolor sit amet . The graphic and typographic operators know this well, in reality all the professions dealing with the universe of communication have a stable relationship with these words, but what is it? Lorem ipsum is a dummy text without any sense.It is a sequence of Latin words that, as they are positioned, do not form sentences with a complete sense, but give life to a test text useful to fill spaces that will subsequently be occupied from ad hoc texts composed by communication professionals. ";
		articleSummary = "Challenge students to write a simple summary about their reading! Using the Somebody-Wanted-But-So-Then framework, students will fill in this reading worksheet that asks readers in third, fourth, and fifth grade to practice summarizing a fiction text and";
		articlePrice = 0;
		articleBuyout = 0;
		articleuser = $user.userId;
	}
  
  // set title

  let editArticle;
  onMount(async () => {
    if (id) {
      editArticle = await $articles.find((item) => item._id === id);
      articleHeadline = editArticle.articleHeadline;
      articlePublisher = editArticle.articlePublisher;
      articleDate = editArticle.articleDate;
      image_url = editArticle.image_url;
      articleLocation = editArticle.articleLocation;
      articleAuthor = editArticle.articleAuthor;
      articleText = editArticle.articleText;
      articleSummary = editArticle.articleSummary;
      articlePrice = editArticle.articlePrice;
      articleBuyout = editArticle.articleBuyout;
      articleuser = editArticle.articleuser;
    }
  });

  // reactivity
  $: articleHeadlineValid = isOKLen(articleHeadline, 5, 255);
  $: articlePublisherValid = isOKLen(articlePublisher, 5, 255);
  $: articleDateValid = isOKLen(articleDate, 5, 255);
  $: image_urlValid = isOKLen(image_url, 5, 255);
  $: articleLocationValid = isOKLen(articleLocation, 5, 255);
  $: articleAuthorValid = isOKLen(articleAuthor, 5, 255);
  $: articleTextValid = isOKLen(articleText, 5, 25000);
  $: articleSummaryValid = isOKLen(articleSummary, 5, 25000);
  $: articlePriceValid = isBetween(articlePrice, 1, 9999999);
  $: articleBuyoutValid = isBetween(articleBuyout, 1, 9999999);

  $: formIsValid =
    articleHeadlineValid &&
    articlePublisherValid &&
    articleDateValid &&
    image_urlValid &&
    articleLocationValid &&
    articleAuthorValid &&
    articleTextValid &&
    articleSummaryValid &&
    articlePriceValid &&
    articleBuyoutValid;

  function isOKLen(str, a, b) {
    if (typeof str === 'string') {
      return str.trim().length >= a && str.trim().length <= b ? true : false;
    }
    return false;
  }

  function isBetween(val, a, b) {
    return Number(val) >= a && Number(val) <= b ? true : false;
  }

  let touched = false;
  async function submitForm() {
  if (!formIsValid) {
    // If the form is not valid, set the 'touched' variable to true
    // so that the validation errors will be displayed
    touched = true;
    return;
  }

  let articleData = {
    articleHeadline: articleHeadline,
    articlePublisher: articlePublisher,
    articleDate: articleDate,
    image_url: image_url,
    articleLocation: articleLocation,
    articleAuthor: articleAuthor,
    articleText: articleText,
    articleSummary: articleSummary,
	articleuser: $user.userId
  };

  if (id) {
    // If there is an ID, update the article with the given ID
    await articles.updateArticle(id, articleData, $user.jwt);
  } else {
    // If there is no ID, add a new article
    await articles.addArticle(articleData, $user.jwt);
  }

  // Redirect to the articles page after the article has been added or updated
  goto('/articles');
}


	function cancel() {
		goto('/articles');
	}

	function deleteArticle() {
		articles.removeArticle(id, $user.jwt);
		goto('/articles');
	}
</script>

<div>
	<form on:submit|preventDefault={submitForm}>
		<!--  -->
		<div class="form-control">
			<label for="articleHeadline">Headline</label>
			<input
				class="input"
				type="text"
				id="articleHeadline"
				class:invalid={!articleHeadlineValid && touched}
				bind:value={articleHeadline}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="articlePublisher">publisher</label>
			<input
				class="input"
				type="text"
				id="articlePublisher"
				class:invalid={!articlePublisherValid && touched}
				bind:value={articlePublisher}
				on:blur={() => (touched = true)}
			/>
		<div class="form-control">
			<label for="articleDate">date</label>
			<input
				class="input"
				type="test"
				id="articleDate"
				class:invalid={!articleDateValid && touched}
				bind:value={articleDate}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="articleLocation">location</label>
			<input
				class="input"
				type="text"
				id="articleLocation"
				class:invalid={!articleLocationValid && touched}
				bind:value={articleLocation}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="articleAuthor">Author</label>
			<input
				class="input"
				type="text"
				id="articleAuthor"
				class:invalid={!articleAuthorValid && touched}
				bind:value={articleAuthor}
				on:blur={() => (touched = true)}
			/>
		</div>
    </div>
    <div class="form-control">
        <label for="image_url">image_url</label>
        <input
            class="input"
            type="text"
            id="image_url"
            class:invalid={!image_urlValid && touched}
            bind:value={image_url}
            on:blur={() => (touched = true)}
        />
    </div>
		<div class="form-control">
			<label for="articleText">text</label>
			<input
				class="input"
				type="text"
				id="articleText"
				class:invalid={!articleTextValid && touched}
				bind:value={articleText}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="articleSummary">summary</label>
			<input
				class="input"
				type="text"
				id="articleSummary"
				class:invalid={!articleSummaryValid && touched}
				bind:value={articleSummary}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="articlePrice">Price</label>
			<input
				class="input"
				type="number"
				id="articlePrice"
				class:invalid={!articlePriceValid && touched}
				bind:value={articlePrice}
				on:blur={() => (touched = true)}
			/>
		</div>
		<div class="form-control">
			<label for="articleBuyout">Buyout</label>
			<input
				class="input"
				type="number"
				id="articleBuyout"
				class:invalid={!articleBuyoutValid && touched}
				bind:value={articleBuyout}
				on:blur={() => (touched = true)}
			/>
		</div>
	</form>
	<div class="footer">
		<Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
		<Button type="button" on:click={submitForm} disabled={!formIsValid}>Save</Button>
			{#if id}
			<Button type="button" mode="outline" on:click={deleteArticle}>Delete</Button>
			{/if}
	</div>
</div>