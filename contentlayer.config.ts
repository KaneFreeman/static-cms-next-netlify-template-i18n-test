import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";

function slugify(text: string) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

const Config = defineDocumentType(() => ({
    name: 'Config',
    isSingleton: true,
    filePathPattern: `config.json`,
    // contentType: 'data',
    fields: {
        base_url: {
            type: 'string',
            required: false,
        },
        site_title: {
            type: 'string',
            required: false,
        },
        site_description: {
            type: 'string',
            required: false,
        },
        site_keywords: {
            type: 'list', of: { type: 'string' },
            required: false,
        },
        twitter_account: {
            type: 'string',
            required: false,
        },
        github_account: {
            type: 'string',
            required: false,
        },
        posts_per_page: {
            type: 'number',
            required: false,
        }
    }
}))

const Author = defineNestedType(() => ({
    name: 'Author',
    fields: {
        slug: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            required: false,
        },
        introduction: {
            type: 'string',
            required: false,
        }
    },
}))

const Authors = defineDocumentType(() => ({
    name: 'Authors',
    filePathPattern: `meta/authors.yml`,
    fields: {
        authors: {
            type: 'list', of: Author
        },
    },
}))

const Tag = defineNestedType(() => ({
    name: 'Tag',
    fields: {
        slug: {
            type: 'string',
            required: true,
        },
        name: {
            type: 'string',
            required: false,
        },
    },
}))


const Tags = defineDocumentType(() => ({
    name: 'Tags',
    filePathPattern: `meta/tags.yml`,
    // contentType: 'data',
    fields: {
        tags: {
            type: 'list', of: Tag
        },
    }
}))

const Posts = defineDocumentType(() => ({
    name: 'Posts',
    filePathPattern: `posts/*.mdx`,
    fields: {
        slug: {
            type: 'string',
            required: false,
        },
        title: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: false,
        },
        author: {
            type: 'string',
            required: false,
        },
        tags: {
            type: 'list', of: { type: 'string' },
            required: false,
        },
    },
    computedFields: {
        slug: {
            type: "string",
            resolve: (doc) => doc.slug ? doc.slug : slugify(doc.title),
        },
        path: {
            type: "string",
            resolve: (doc) => doc._raw.sourceFileName,
        }
    }
}))

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Config, Authors, Tags, Posts],
})